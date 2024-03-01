// @packages
import * as React from 'react';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

// @interfaces
interface MenuIconsProps {
  menu: string;
  isSelected: boolean;
}

export default function MenuIcons({ menu, isSelected }: MenuIconsProps) {
  switch (menu) {
    case '/clients':
      return <GridViewRoundedIcon sx={{ color: isSelected ? 'red' : 'inherit' }} />;
    case '/deposits':
      return <AccountBalanceRoundedIcon sx={{ color: isSelected ? 'red' : 'inherit' }} />;
    case '/withdrawals':
      return <RequestQuoteIcon sx={{ color: isSelected ? 'red' : 'inherit' }} />;
    case '/balance':
      return <BusinessCenterRoundedIcon sx={{ color: isSelected ? 'red' : 'inherit' }} />;
    case '/sales':
      return <BarChartIcon sx={{ color: isSelected ? 'red' : 'inherit' }} />;
    case '/brokers':
      return <GroupsRoundedIcon sx={{ color: isSelected ? 'red' : 'inherit' }} />
    case '/logout':
      return <LogoutIcon sx={{ color: isSelected ? 'red' : 'inherit' }} />
    default:
      return null;
  }
}
