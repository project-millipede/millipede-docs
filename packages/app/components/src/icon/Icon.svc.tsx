import {
  AccountBalance,
  Book,
  BugReport,
  Business,
  CallSplit,
  CenterFocusWeak,
  CloudUpload,
  Code,
  Compare,
  CompareArrows,
  ContactSupport,
  Create,
  Description,
  DesignServices,
  Explore,
  FactCheck,
  Filter1,
  Filter2,
  Filter3,
  Filter4,
  Filter5,
  Filter6,
  Filter7,
  FilterNone,
  FindReplace,
  Fingerprint,
  FlashOn,
  Flip,
  FormatQuote,
  Functions,
  GroupWork,
  Info,
  Layers,
  LocationDisabled,
  Lock,
  Map,
  MiscellaneousServices,
  ModelTraining,
  OfflineBolt,
  Portrait,
  ReadMore,
  RunningWithErrors,
  Science,
  Security,
  SportsScore,
  Star,
  Toc,
  TouchApp,
  Warning,
} from '@mui/icons-material';
import React from 'react';

export const getIconByName = (name: string) => {
  switch (name) {
    case 'star': {
      return <Star />;
    }
    case 'offline_bolt': {
      return <OfflineBolt />;
    }
    case 'toc': {
      return <Toc />;
    }
    case 'find_replace': {
      return <FindReplace />;
    }
    case 'functions': {
      return <Functions />;
    }
    case 'security': {
      return <Security />;
    }
    case 'bug_report': {
      return <BugReport />;
    }
    case 'compare_arrows': {
      return <CompareArrows />;
    }
    case 'description': {
      return <Description />;
    }
    case 'model_training': {
      return <ModelTraining />;
    }
    case 'touch_app': {
      return <TouchApp />;
    }
    case 'flip': {
      return <Flip />;
    }
    case 'map': {
      return <Map />;
    }
    case 'cloud_upload': {
      return <CloudUpload />;
    }
    case 'lock': {
      return <Lock />;
    }
    case 'location_disabled': {
      return <LocationDisabled />;
    }
    case 'center_focus_weak': {
      return <CenterFocusWeak />;
    }
    case 'create': {
      return <Create />;
    }
    case 'layers': {
      return <Layers />;
    }
    case 'warning': {
      return <Warning />;
    }
    case 'flash_on': {
      return <FlashOn />;
    }
    case 'format_quote': {
      return <FormatQuote />;
    }
    case 'explore': {
      return <Explore />;
    }
    case 'code': {
      return <Code />;
    }
    case 'call_split': {
      return <CallSplit />;
    }
    case 'book': {
      return <Book />;
    }
    case 'info': {
      return <Info />;
    }
    case 'contact_support': {
      return <ContactSupport />;
    }
    case 'group_work': {
      return <GroupWork />;
    }
    case 'business': {
      return <Business />;
    }
    case 'portrait': {
      return <Portrait />;
    }
    case 'fact_check': {
      return <FactCheck />;
    }
    case 'compare': {
      return <Compare />;
    }
    case 'running_with_errors': {
      return <RunningWithErrors />;
    }
    case 'filter_none': {
      return <FilterNone />;
    }
    case 'filter_1': {
      return <Filter1 />;
    }
    case 'filter_2': {
      return <Filter2 />;
    }
    case 'filter_3': {
      return <Filter3 />;
    }
    case 'filter_4': {
      return <Filter4 />;
    }
    case 'filter_5': {
      return <Filter5 />;
    }
    case 'filter_6': {
      return <Filter6 />;
    }
    case 'filter_7': {
      return <Filter7 />;
    }
    case 'account_balance': {
      return <AccountBalance />;
    }
    case 'science': {
      return <Science />;
    }
    case 'fingerprint': {
      return <Fingerprint />;
    }
    case 'miscellaneous_services': {
      return <MiscellaneousServices />;
    }
    case 'design_services': {
      return <DesignServices />;
    }
    case 'read_more': {
      return <ReadMore />;
    }
    case 'sports_score': {
      return <SportsScore />;
    }
    default: {
      return <></>;
    }
  }
};
