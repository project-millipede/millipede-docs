import { PageTypes } from '@app/types';

export const loadPages = (
  _pathname: string,
  _currentPages: Array<PageTypes.Page> = []
) => {
  return [
    ...pagesAI,
    ...pagesRethinkSecurity,
    ...pagesPIDP,
    ...pagesPET,
    ...pagesPerspective,
    ...pagesGuides,
    ...pagesDiscoverMore
  ];
};

export const defaultIcon: PageTypes.Icon = {
  type: PageTypes.IconType.MUI,
  name: 'star'
};

export const defaultFAIcon: PageTypes.Icon = {
  type: PageTypes.IconType.FA,
  name: ''
};

export const pagesAI: Array<PageTypes.Page> = [
  {
    pathname: 'ai',
    icon: defaultIcon,
    children: [
      {
        pathname: 'ai/objectives',
        icon: { ...defaultIcon, name: 'offline_bolt' }
      },
      {
        pathname: 'ai/general',
        icon: { ...defaultIcon, name: 'toc' }
      },
      {
        pathname: 'ai/reverse',
        icon: { ...defaultIcon, name: 'find_replace' },
        children: [
          {
            pathname: 'ai/reverse/intro',
            icon: { ...defaultIcon, name: 'slideshow' }
          },
          {
            pathname: 'ai/reverse/hooks',
            icon: { ...defaultIcon, name: 'functions' }
          }
        ]
      }
    ]
  }
];

export const pagesRethinkSecurity: Array<PageTypes.Page> = [
  {
    pathname: 'rethink-security',
    icon: { ...defaultIcon, name: 'security' },
    children: [
      {
        pathname: 'rethink-security/intro',
        icon: { ...defaultIcon, name: 'slideshow' }
      },
      {
        pathname: 'rethink-security/attack-vectors',
        icon: { ...defaultIcon, name: 'bug_report' },
        children: [
          {
            pathname: 'rethink-security/attack-vectors/intro',
            icon: { ...defaultIcon, name: 'slideshow' }
          },
          {
            pathname: 'rethink-security/attack-vectors/comparison',
            icon: { ...defaultIcon, name: 'compare_arrows' }
          }
        ]
      }
    ]
  }
];

export const pagesPIDP: Array<PageTypes.Page> = [
  {
    pathname: 'pidp',
    icon: defaultIcon,
    children: [
      {
        pathname: 'pidp/intro',
        icon: { ...defaultIcon, name: 'slideshow' }
      },
      {
        pathname: 'pidp/approach',
        icon: { ...defaultIcon, name: 'filter_center_focus' },
        children: [
          {
            pathname: 'pidp/approach/intro',
            icon: { ...defaultIcon, name: 'slideshow' }
          },
          {
            pathname: 'pidp/approach/by-example',
            icon: { ...defaultIcon, name: 'touch_app' }
          }
        ]
      },
      {
        pathname: 'pidp/use-case',
        icon: { ...defaultIcon, name: 'extension' },
        children: [
          {
            pathname: 'pidp/use-case/intro',
            icon: { ...defaultIcon, name: 'slideshow' }
          },
          {
            pathname: 'pidp/use-case/recognition',
            icon: { ...defaultIcon, name: 'flip' }
          },
          {
            pathname: 'pidp/use-case/response',
            icon: { ...defaultIcon, name: 'create' }
          }
        ]
      }
    ]
  }
];

export const pagesPET: Array<PageTypes.Page> = [
  {
    pathname: 'pet',
    icon: defaultIcon,
    children: [
      {
        pathname: 'pet/dataflow',
        icon: { ...defaultIcon, name: 'waves' },
        children: [
          {
            pathname: 'pet/dataflow/comparison',
            icon: { ...defaultIcon, name: 'compare_arrows' }
          }
        ]
      }
    ]
  }
];

export const pagesPerspective: Array<PageTypes.Page> = [
  {
    pathname: 'perspective',
    icon: { ...defaultIcon, name: 'layers' },
    children: [
      {
        pathname: 'perspective/strategy',
        icon: { ...defaultIcon, name: 'list' }
      },
      {
        pathname: 'perspective/cause',
        icon: { ...defaultIcon, name: 'warning' }
      },
      {
        pathname: 'perspective/shortsighted',
        icon: { ...defaultIcon, name: 'trending_down' }
      },
      {
        pathname: 'perspective/competence',
        icon: { ...defaultIcon, name: 'flash_on' }
      },
      {
        pathname: 'perspective/reference',
        icon: { ...defaultIcon, name: 'format_quote' }
      }
    ]
  }
];

export const pagesGuides: Array<PageTypes.Page> = [
  {
    pathname: 'guides',
    icon: { ...defaultIcon, name: 'explore' },
    children: [
      {
        pathname: 'guides/engineering',
        icon: {
          ...defaultIcon,
          name: 'code'
        },
        children: [
          {
            pathname: 'guides/engineering/applicationTypes',
            icon: {
              ...defaultIcon,
              name: 'call_split'
            }
          }
        ]
      },
      {
        pathname: 'guides/research',
        icon: {
          ...defaultIcon,
          name: 'book'
        },
        children: [
          {
            pathname: 'guides/research/paper',
            icon: { ...defaultIcon, name: 'book' }
          }
        ]
      },
      {
        pathname: 'guides/disinformation',
        icon: { ...defaultIcon, name: 'info' },
        children: [
          {
            pathname: 'guides/disinformation/general',
            icon: { ...defaultIcon, name: 'toc' }
          },
          {
            pathname: 'guides/disinformation/objectives',
            icon: { ...defaultIcon, name: 'assessment' }
          }
        ]
      }
    ]
  }
];

export const pagesDiscoverMore: Array<PageTypes.Page> = [
  {
    pathname: 'discover-more',
    icon: { ...defaultIcon, name: 'info' },
    children: [
      {
        pathname: 'discover-more/support',
        icon: {
          ...defaultIcon,
          name: 'contact_support'
        }
      },
      {
        pathname: 'discover-more/team',
        icon: {
          ...defaultIcon,
          name: 'group_work'
        }
      },
      {
        pathname: 'discover-more/organisation',
        icon: {
          ...defaultIcon,
          name: 'business'
        }
      }
    ]
  }
];
