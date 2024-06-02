import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Layers } from '@mui/icons-material';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import { Button } from '@mui/material';

export default function DataLayer({ handleListLayerItemSelected,handleAddWorkspaceClick  }) {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const layerNames = [
    "ACLED_Africa",
    "ACLED_Antarctica",
    "ACLED_Caucasus and Central Asia",
    "ACLED_East Asia",
    "ACLED_LatinAmerica",
    "ACLED_Europe",
    "ACLED_Middle East",
    "ACLED_Oceania",
    "ACLED_South Asia",
    "ACLED_Southeast Asia",
    "ACLED_USA&Canada",
    "_Vessel",
    "_Parlor"
  ];

  const handleListItemClick = (index, text) => {
    setSelectedItem(index);
    handleListLayerItemSelected(text);
  };
  const handleButtonClick = () => {
    handleAddWorkspaceClick();
  };

  return (
    <div style={{ height: '630px' }}>
      <div style={{ padding: '10px', borderBottom: '1px solid white' }}>
        Data Layers
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper', background: 'transparent' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          className='layerList'
        >
          {layerNames.map((data, index) => (
            <ListItemButton
              key={index}
              style={{
                borderBottom: '1px solid white',
                backgroundColor: selectedItem === index ? 'darkcyan' : 'transparent',
              }}
              onClick={() => handleListItemClick(index, data)}
            >
              <ListItemIcon>
                <Layers />
              </ListItemIcon>
              <ListItemText primary={data} />
            </ListItemButton>
          ))}
        </List>

        <Button
          style={{
            width: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          onClick={handleButtonClick}
        >
          <ConnectedTvIcon style={{ width: '80px', height: '80px' }} />
          <div style={{ color: 'white' }}>Add Workspace</div>
        </Button>
      </div>
    </div>
  );
}