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
}

export default function MenuIcons({ menu }: MenuIconsProps) {
  switch (menu) {
    case '/clients':
      return <GridViewRoundedIcon />;
    case '/deposits':
      return <AccountBalanceRoundedIcon />;
    case '/withdrawals':
      return <RequestQuoteIcon />;;
    case '/balance':
      return <BusinessCenterRoundedIcon />;
    case '/sales':
      return <BarChartIcon />;
    case '/brokers':
      return <GroupsRoundedIcon />
    case '/logout':
      return <LogoutIcon />
    default:
      return null;
  }
}
