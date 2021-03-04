import { PageTypes } from '@app/types';

export const loadPages = (
  _pathname: string,
  _currentPages: Array<PageTypes.Page> = []
) => {
  return [
    ...pagesAI,
    ...pagesPET,
    ...pagesPIDP,
    ...pagesSecurity,
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
    icon: { ...defaultIcon, name: 'offline_bolt' },
    children: [
      {
        pathname: 'ai/general',
        icon: { ...defaultIcon, name: 'toc' }
      },
      {
        pathname: 'ai/reverse',
        icon: { ...defaultIcon, name: 'find_replace' },
        children: [
          {
            pathname: 'ai/reverse/hooks',
            icon: { ...defaultIcon, name: 'functions' }
          }
        ]
      },
      {
        pathname: 'ai/discover-more',
        icon: { ...defaultIcon, name: 'info' },
        children: [
          {
            pathname: 'ai/discover-more/roadmap',
            icon: { ...defaultIcon, name: 'map' }
          }
        ]
      }
    ]
  }
];

export const pagesSecurity: Array<PageTypes.Page> = [
  {
    pathname: 'security',
    icon: { ...defaultIcon, name: 'security' },
    children: [
      {
        pathname: 'security/models',
        icon: { ...defaultIcon, name: 'description' },
        children: [
          {
            pathname: 'security/models/comparison',
            icon: { ...defaultIcon, name: 'compare_arrows' }
          },
          {
            pathname: 'security/models/rethink',
            icon: { ...defaultIcon, name: 'model_training' }
          }
        ]
      },
      {
        pathname: 'security/attack-vectors',
        icon: { ...defaultIcon, name: 'bug_report' },
        children: [
          {
            pathname: 'security/attack-vectors/comparison',
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
        pathname: 'pidp/approach',
        icon: { ...defaultIcon, name: 'filter_center_focus' },
        children: [
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
            pathname: 'pidp/use-case/recognition',
            icon: { ...defaultIcon, name: 'flip' }
          },
          {
            pathname: 'pidp/use-case/response',
            icon: { ...defaultIcon, name: 'create' }
          }
        ]
      },
      {
        pathname: 'pidp/discover-more',
        icon: { ...defaultIcon, name: 'info' },
        children: [
          {
            pathname: 'pidp/discover-more/roadmap',
            icon: { ...defaultIcon, name: 'map' }
          },
          {
            pathname: 'pidp/discover-more/wps',
            icon: { ...defaultIcon, name: 'list' },
            children: [
              {
                pathname: 'pidp/discover-more/wps/wp1',
                icon: { ...defaultIcon, name: 'create' }
              },
              {
                pathname: 'pidp/discover-more/wps/wp2',
                icon: { ...defaultIcon, name: 'create' }
              },
              {
                pathname: 'pidp/discover-more/wps/wp3',
                icon: { ...defaultIcon, name: 'create' }
              },
              {
                pathname: 'pidp/discover-more/wps/wp4',
                icon: { ...defaultIcon, name: 'create' }
              },
              {
                pathname: 'pidp/discover-more/wps/wp5',
                icon: { ...defaultIcon, name: 'create' }
              },
              {
                pathname: 'pidp/discover-more/wps/wp6',
                icon: { ...defaultIcon, name: 'create' }
              },
              {
                pathname: 'pidp/discover-more/wps/wp7',
                icon: { ...defaultIcon, name: 'create' }
              }
            ]
          }
        ]
      },
      {
        pathname: 'pidp/discover-more/related-projects',
        icon: { ...defaultIcon, name: 'list' }
      },
      {
        pathname: 'pidp/discover-more/unreliable-procedures',
        icon: { ...defaultIcon, name: 'list' },
        children: [
          {
            pathname: 'pidp/discover-more/unreliable-procedures/operator',
            icon: { ...defaultIcon, name: 'create' }
          },
          {
            pathname: 'pidp/discover-more/unreliable-procedures/regulation',
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
      },
      {
        pathname: 'pet/use-case',
        icon: { ...defaultIcon, name: 'extension' },
        children: [
          {
            pathname: 'pet/use-case/publish',
            icon: { ...defaultIcon, name: 'cloud_upload' }
          },
          {
            pathname: 'pet/use-case/access',
            icon: { ...defaultIcon, name: 'lock' }
          },
          {
            pathname: 'pet/use-case/analytics',
            icon: { ...defaultIcon, name: 'assessment' }
          }
        ]
      },
      {
        pathname: 'pet/discover-more',
        icon: { ...defaultIcon, name: 'info' },
        children: [
          {
            pathname: 'pet/discover-more/roadmap',
            icon: { ...defaultIcon, name: 'map' }
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
        icon: { ...defaultIcon, name: 'error' },
        children: [
          {
            pathname: 'guides/disinformation/objectives',
            icon: { ...defaultIcon, name: 'center_focus_weak' }
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
        pathname: 'discover-more/roadmap',
        icon: { ...defaultIcon, name: 'map' }
      },
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
        },
        children: [
          {
            pathname: 'discover-more/team/cv',
            icon: { ...defaultIcon, name: 'map' }
          }
        ]
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
