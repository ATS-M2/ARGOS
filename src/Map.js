import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLat } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { inside } from '@turf/turf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLayerGroup, faTools, faGear, faBusSimple } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import './Map.css';
import Cookies from "js-cookie"
import assets from "./assets";
import Window from './components/window';
import MapStyleSelection from './components/selection';
import PDLTabs from './components/pdlTab';
import DataLayer from './components/layer';
import SearchPanel from './components/search';
import { Popup } from "mapbox-gl";
import SummaryPanel from './components/summary';

mapboxgl.accessToken =
  'pk.eyJ1Ijoib2FrdHJlZWFuYWx5dGljcyIsImEiOiJjbGhvdWFzOHQxemYwM2ZzNmQxOW1xZXdtIn0.JPcZgPfkVUutq8t8Z_BaHg';

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const isInitialMount = useRef(true);
  const [draw, setDraw] = useState(null);
  const [pointsInRect, setPointsInRect] = useState([]);
  const popUp = new Popup({ closeButton: false, anchor: "left" });

  const [isLayerVisible, setIsLayerVisible] = useState(false);
  const [isQueryVisible, setIsQueryVisible] = useState(false);
  const [isToolVisible, setIsToolVisible] = useState(false);
  const [isSettingVisible, setIsSettingVisible] = useState(false);

  const [selectedLayerListItemText, setSelectedLayerListItemText] = React.useState(null);

  const [mGeoJson, setGeoJson] = useState();
  const [geoLength, setGeoLength] = useState(null)
  const [preSource, setPreSource] = useState(null)

  const [loading, setLoading] = useState(false);

  const handleListLayerItemSelected = (text) => {

    setSelectedLayerListItemText(text);
    // Do something with the selected list item text
  };

  const setWorkLayer = () => {
    setLoading(true)
    const layername = selectedLayerListItemText.split("_")[1]
    console.log(layername)
    fetch(`layers/${layername}.json`
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson)
        setGeoJson(myJson)
        setGeoLength(myJson.features.length)
        putGeoJson2Map(myJson)
        setLoading(false)
      });
  }

  const putGeoJson2Map = (geodata) => {

    if (preSource != null) {
      mapRef.current?.removeLayer(preSource)
      mapRef.current?.removeLayer('unclustered' + preSource)
      mapRef.current?.removeLayer('cluster-count' + preSource)
      mapRef.current?.removeSource(preSource)
    }

    mapRef.current?.flyTo({
      center: geodata.features[0].geometry.coordinates,
      zoom: 5,
    });
    mapRef.current?.addSource(selectedLayerListItemText, {
      type: "geojson",
      data: geodata,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 30
    });
    // Add a symbol layer

    mapRef.current?.addLayer({
      id: selectedLayerListItemText,
      type: "circle",
      source: selectedLayerListItemText,
      filter: ['has', 'point_count'],

      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
        ]
      },
      layout: {
        visibility: "visible",
      },
    });

    mapRef.current?.addLayer({
      id: 'cluster-count' + selectedLayerListItemText,
      type: 'symbol',
      source: selectedLayerListItemText,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });
    mapRef.current?.addLayer({
      id: 'unclustered' + selectedLayerListItemText,
      type: 'circle',
      source: selectedLayerListItemText,
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    });
    mapRef.current?.on('click', selectedLayerListItemText, (e) => {
      const features = mapRef.current?.queryRenderedFeatures(e.point, {
        layers: [selectedLayerListItemText]
      });
      const clusterId = features?.[0].properties?.cluster_id;
      const source = mapRef.current?.getSource(selectedLayerListItemText)

      source.getClusterExpansionZoom(
        clusterId,
        (err, zoom) => {
          if (err) return;
          if (features?.[0].geometry.type === 'Point') {
            mapRef.current?.easeTo({
              center: [features?.[0].geometry.coordinates[0], features?.[0].geometry.coordinates[1]],
              zoom: zoom
            });
          }

        }
      );
    });

    mapRef.current?.on("style.load", () => {
      mapRef.current?.flyTo({
        center: geodata.features[0].geometry.coordinates,
        zoom: 5,
      });
      mapRef.current?.addSource(selectedLayerListItemText, {
        type: "geojson",
        data: geodata,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 30
      });
      // Add a symbol layer

      mapRef.current?.addLayer({
        id: selectedLayerListItemText,
        type: "circle",
        source: selectedLayerListItemText,
        filter: ['has', 'point_count'],

        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        },
        layout: {
          visibility: "visible",
        },
      });

      mapRef.current?.addLayer({
        id: 'cluster-count' + selectedLayerListItemText,
        type: 'symbol',
        source: selectedLayerListItemText,
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });
      mapRef.current?.addLayer({
        id: 'unclustered' + selectedLayerListItemText,
        type: 'circle',
        source: selectedLayerListItemText,
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });
      mapRef.current?.on('click', selectedLayerListItemText, (e) => {
        const features = mapRef.current?.queryRenderedFeatures(e.point, {
          layers: [selectedLayerListItemText]
        });
        const clusterId = features?.[0].properties?.cluster_id;
        const source = mapRef.current?.getSource(selectedLayerListItemText)

        source.getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;
            if (features?.[0].geometry.type === 'Point') {
              mapRef.current?.easeTo({
                center: [features?.[0].geometry.coordinates[0], features?.[0].geometry.coordinates[1]],
                zoom: zoom
              });
            }

          }
        );
      });
    })

    mapRef.current?.on("click", 'unclustered' + selectedLayerListItemText, (e) => {
      if (mapRef.current)
        mapRef.current.getCanvas().style.cursor = "pointer";


      const elementsToRemove = document.querySelectorAll(".mapboxgl-popup");

      elementsToRemove.forEach((element) => {
        element.remove();
      });
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const values = e.features[0].properties;
      const cheader = Object.keys(values);
      let html = "";
      // const values = i.properties;

      html += `<div class = "popup">`;
      const obj = cheader.reduce((object, header, index) => {
        html += `<div style="width:100%; display:flex">
                           <label for="name" style="width:40%; text-align:right; padding-right: 5px; align-self : center" >${header} :</label>
                           <div type="text"  style="width:60%; border: 0.01em solid white; padding : 3px">${values[header]}</div>
                       </div>
                       `;
        object[header] = values[header];
        return object;
      }, {});
      html += `<div style="width:100%; display:flex">
                           <label for="name" style="width:40%; text-align:right; padding-right: 5px; align-self : center" >Latitude :</label>
                           <div type="text"  style="width:60%; border: 0.01em solid white; padding : 3px">${coordinates[1]}</div>
                       </div>`;
      html += `<div style="width:100%; display:flex">
                       <label for="name" style="width:40%; text-align:right; padding-right: 5px; align-self : center" >Longtitude :</label>
                       <div type="text"  style="width:60%; border: 0.01em solid white; padding : 3px">${coordinates[0]}</div>
                   </div>`;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popUp.setLngLat(coordinates).setHTML(html).addTo(mapRef.current);

    });

    setPreSource(selectedLayerListItemText)
  }

  const [mapTileStyle, setMapTileStyle] = useState('mapbox://styles/mapbox/satellite-streets-v12');
  const handleTileStyleChange = (newTileStyle) => {
    setMapTileStyle(newTileStyle);
    console.log('Tile Style:', newTileStyle);
  };
  const handleGetPointsInRect = () => {
    if (mapRef.current && draw && mGeoJson) {
      const features = draw.getAll().features;
      if (features.length > 0) {
        const rectCoords = features[0].geometry.coordinates[0];
        const pointsInRect = mGeoJson.features.filter((feature) =>
          inside(feature, {
            type: 'Polygon',
            coordinates: [rectCoords],
          })
        );
        console.log(pointsInRect)
        setPointsInRect(pointsInRect);
      }
    }
  };
  // Initialize map when component mounts
  useEffect(() => {
    if (isInitialMount.current) {
      // This code will run only on the initial mount
      isInitialMount.current = false;
    } else {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: mapTileStyle,
        center: [-97.9222112121185, 39.3812661305678],
        zoom: 4,
      });
      map.doubleClickZoom.disable();
      mapRef.current = map;

      const drawInstance = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });
      setDraw(drawInstance);

      mapRef.current.addControl(drawInstance, 'top-right');
      mapRef.current.addControl(new mapboxgl.NavigationControl());

      mapRef.current.on('draw.update', handleGetPointsInRect);
      // Clean up on unmount
      return () => map.remove();
    }
  }, []);

  useEffect(() => {
    if (mapRef.current != null) {
      console.log(mapTileStyle)
      mapRef.current.setStyle(mapTileStyle)
    }
  }, [mapTileStyle])

  return (
    <div>
      <div className='topbar-container'>

        <div className='barBackground'>
        </div>
        <div
          style={{
            color: "white",
            marginLeft: "100px",
            fontSize: "30px",
            fontWeight: 'bold',
            zIndex: 1
          }}
        >
          Geospatial Mapping Software
        </div>
        <div
          style={{
            color: "white",
            fontSize: "16px",
            zIndex: 1,
            alignItems: 'center',
            display: 'flex',
            position: 'absolute',
            left: '80%'
          }}
        >
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "20px",
            }}
            alt="Remy Sharp"
            src={assets.images.avatar}
          />
          <div style={{ marginLeft: '10px' }}>Matthew May</div>
          <img
            src={assets.images.logout}
            alt="Button label"
            style={{ width: "30px", height: "30px", marginLeft: '30px' }}
          />
        </div>
      </div>

      <div className='sidebar-container'>
        <div className='barBackground'>
        </div>
        <div className='sidebar-icon-container'>
          <FontAwesomeIcon icon={faLayerGroup} className="sidebar-icons" onClick={() => { setIsLayerVisible(true) }} />
          <FontAwesomeIcon icon={faSearch} className="sidebar-icons" onClick={() => { setIsQueryVisible(true) }} />
          <FontAwesomeIcon icon={faTools} className="sidebar-icons" onClick={() => { setIsToolVisible(true) }} />
          <FontAwesomeIcon icon={faGear} className="sidebar-icons" onClick={() => { setIsSettingVisible(true) }} />
        </div>
      </div>

      {isLayerVisible ?
        <Window title="Data Layer" icon={faLayerGroup} initialSize={{ width: 1000, height: 700 }} initialPosition={{ x: 100, y: 100 }} onClose={() => { setIsLayerVisible(false) }}>
          <DataLayer handleAddWorkspaceClick={setWorkLayer}
            handleListLayerItemSelected={handleListLayerItemSelected} />

        </Window> : ""
      }

      {isQueryVisible ?
        <Window title="Query" icon={faSearch} initialSize={{ width: 600, height: 400 }} initialPosition={{ x: 100, y: 100 }} onClose={() => { setIsQueryVisible(false) }}>
          <SearchPanel onGeoFenceClick={handleGetPointsInRect} />
        </Window> : ""
      }

      {isToolVisible ?
        <Window title="Tool" icon={faTools} initialSize={{ width: 1200, height: 880 }} initialPosition={{ x: 100, y: 100 }} onClose={() => { setIsToolVisible(false) }}>
          <PDLTabs />
        </Window> : ""
      }

      {isSettingVisible ?
        <Window title="Setting" icon={faGear} initialSize={{ width: 800, height: 400 }} initialPosition={{ x: 100, y: 100 }} onClose={() => { setIsSettingVisible(false) }}>
          <MapStyleSelection onTileStyleChange={handleTileStyleChange} />
        </Window> : ""
      }

      {/* <Window title="Summary" icon={faBusSimple} initialSize={{ width: 600, height: 400 }} initialPosition={{ x: 1200, y: 100 }} onClose={() => { setIsSettingVisible(false) }}>
        <SummaryPanel  total={geoLength}/>
      </Window> */}

      <div
        style={
          loading
            ? {
              position: "absolute",
              zIndex: "10",
              textAlign: "center",
              width: "100%",
              height: "90%",
              display: "block",
            }
            : { display: "none" }
        }
      >
        <img src={assets.images.loading} style={{ marginTop: "10%" }} />
        <h2 style={{ color: "white", marginTop: "-10%" }}>Loading Layer</h2>
      </div>

      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
