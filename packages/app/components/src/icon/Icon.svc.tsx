import React, {
  Assessment,
  Book,
  BugReport,
  Business,
  CallSplit,
  CenterFocusWeak,
  CloudUpload,
  Code,
  CompareArrows,
  ContactSupport,
  Create,
  Description,
  Error,
  Explore,
  Extension,
  FilterCenterFocus,
  FindReplace,
  FlashOn,
  Flip,
  FormatQuote,
  Functions,
  GroupWork,
  Info,
  Layers,
  List,
  Lock,
  Map,
  ModelTraining,
  OfflineBolt,
  Security,
  Slideshow,
  Star,
  Toc,
  TouchApp,
  TrendingDown,
  Warning,
  Waves,
} from '@material-ui/icons';

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
    case 'slideshow': {
      return <Slideshow />;
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
    case 'waves': {
      return <Waves />;
    }
    case 'filter_center_focus': {
      return <FilterCenterFocus />;
    }
    case 'touch_app': {
      return <TouchApp />;
    }
    case 'extension': {
      return <Extension />;
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
    case 'center_focus_weak': {
      return <CenterFocusWeak />;
    }
    case 'create': {
      return <Create />;
    }
    case 'layers': {
      return <Layers />;
    }
    case 'list': {
      return <List />;
    }
    case 'warning': {
      return <Warning />;
    }
    case 'trending_down': {
      return <TrendingDown />;
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
    case 'error': {
      return <Error />;
    }
    case 'assessment': {
      return <Assessment />;
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
    default: {
      return name;
    }
  }
};
