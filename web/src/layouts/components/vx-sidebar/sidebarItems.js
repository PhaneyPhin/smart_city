/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: null,
    name: "Dashboard",
    slug: "dashboard",
    
    tagColor: "warning",
    icon: "HomeIcon",
    i18n: "Dashboard",
    submenu: [
      {
        url: '/dashboard/analytics',
        name: "Analytics",
        slug: "dashboardAnalytics",
        i18n: "Analytics",
      },
      {
        url: '/dashboard/ecommerce',
        name: "eCommerce",
        slug: "dashboardECommerce",
        i18n: "eCommerce",
      },
    ]
  },
  {
    url: null,
    name: "Dashboard",
    slug: "dashboard",
    
    tagColor: "warning",
    icon: "CopyIcon",
    i18n: "General Data",
    submenu: [
      {
        icon:"UserIcon",
        url: '/general-data/user',
        name: "Analytics",
        slug: "dashboardAnalytics",
        i18n: "User Data",
      },
      {
        icon:"UsersIcon",
        url: '/general-data/user-group',
        name: "Analytics",
        slug: "dashboardAnalytics",
        i18n: "User Group",
      },
      {
        icon:"MonitorIcon",
        url: '/general-data/device',
        name: "eCommerce",
        slug: "dashboardECommerce",
        i18n: "Device",
      },
      {
        icon:"CodesandboxIcon",
        url: '/general-data/device-group',
        name: "eCommerce",
        slug: "dashboardECommerce",
        i18n: "Device Group",
      },
      {
        icon:'CodepenIcon',
        url: '/general-data/device-type',
        name: "eCommerce",
        slug: "dashboardECommerce",
        i18n: "Device Type",
      },
    ]
  },

  {
    url: null,
    name: "Solution",
    slug: "Sulution",
    
    tagColor: "warning",
    icon: "LayoutIcon",
    i18n: "Solution",
    submenu:[
      {
        url: null,
        name: "Dashboard",
        slug: "dashboard",
        
        tagColor: "warning",
        icon: "LayoutIcon",
        i18n: "Security",
        submenu:[
          {
            url: '/pages/cctv',
            name: "map",
            icon: "CircleIcon",
            i18n: "CCTV",
          },
          {
            url: '/pages/sos',
            name: "map",
            icon: "CircleIcon",
            i18n: "SOS",
          },
          {
            url: '/pages/license plate',
            name: "map",
            icon: "CircleIcon",
            i18n: "License Plate",
          },
          {
            url: '/pages/face detection',
            name: "map",
            icon: "CircleIcon",
            i18n: "Face Detection",
          }
        ]
      },
      {
        url: null,
        name: "Dashboard",
        slug: "dashboard",
        
        tagColor: "warning",
        icon: "LayoutIcon",
        i18n: "Environment",
        submenu:[
          {
            url: '/pages/evironment/pm2.5',
            name: "map",
            icon: "CircleIcon",
            i18n: "PM 2.5",
          },
          {
            url: '/pages/evironment/wind',
            name: "map",
            icon: "CircleIcon",
            i18n: "Wind",
          },
          {
            url: '/pages/evironment/water',
            name: "map",
            icon: "CircleIcon",
            i18n: "Water",
          }
        ]
      }
      ,{
        url: null,
        name: "Dashboard",
        slug: "dashboard",
        
        tagColor: "warning",
        icon: "LayoutIcon",
        i18n: "Public Facility",
        submenu:[
          {
            url: '/pages/public facility/sos',
            name: "map",
            icon: "CircleIcon",
            i18n: "SOS",
          },
          {
            url: '/pages/public facility/maintenance pian',
            name: "map",
            icon: "CircleIcon",
            i18n: "Maintance Pian",
          },
          {
            url: '/pages/public facility/status',
            name: "map",
            icon: "CircleIcon",
            i18n: "Status",
          },
          {
            url: '/pages/public facility/streelgiht sensor',
            name: "map",
            icon: "CircleIcon",
            i18n: "Streetlight Sensor",
          },
          
          {
            url: '/pages/public facility/water pump ctrl',
            name: "map",
            icon: "CircleIcon",
            i18n: "Water Pump Control",
          },
          
          
          {
            url: '/pages/public facility/display',
            name: "map",
            icon: "CircleIcon",
            i18n: "Display",
          }
        ]
      },{
        url: null,
        name: "Dashboard",
        slug: "dashboard",
        
        tagColor: "warning",
        icon: "LayoutIcon",
        i18n: "Transportation",
        submenu:[
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "GPS Tracking"
          },
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "Temperature Sensor"
          },
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "Oil Level Sensor"
          },
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "Action Plan"
          },
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "Display"
          }
        ]
      },
      {
        url: null,
        name: "Dashboard",
        slug: "dashboard",
        
        tagColor: "warning",
        icon: "LayoutIcon",
        i18n: "Utility",
        submenu:[
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "Streetlight Sensor"
          },
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "Water Pres Sensor"
          },
          
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "Plan"
          }
        ]
      },
      {
        url: null,
        name: "Dashboard",
        slug: "dashboard",
        
        tagColor: "warning",
        icon: "LayoutIcon",
        i18n: "Collection Management",
        submenu:[
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "Plan"
          }
        ]
      },
      {
        url: null,
        name: "Dashboard",
        slug: "dashboard",
        
        tagColor: "warning",
        icon: "LayoutIcon",
        i18n: "Machine Control",
        submenu:[
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "Water Pump Control"
          },
          {
            url: null,
            name: "Dashboard",
            slug: "dashboard",
            
            tagColor: "warning",
            icon: "CircleIcon",
            i18n: "Electric Power Control"
          }
        ]
      }
    ]
  },
  {
    url: null,
    name: "Dashboard",
    slug: "dashboard",
    
    tagColor: "warning",
    icon: "LayoutIcon",
    i18n: "Data",
  },
  {
    url: null,
    name: "Dashboard",
    slug: "dashboard",
    
    tagColor: "warning",
    icon: "LayoutIcon",
    i18n: "Setting",
  },
  {
    url: null,
    name: "Dashboard",
    slug: "dashboard",
    
    tagColor: "warning",
    icon: "LayoutIcon",
    i18n: "About",
  },
  
  
  {
    url: '/pages/test',
    name: "Profile",
    icon: "UserIcon",
    i18n: "Dashboard Dynamics",
  },
  {
    url: null,
    name: "Menu Levels",
    icon: "MenuIcon",
    i18n: "MenuLevels",
    submenu: [
      {
        url: null,
        name: "Menu Level 2.1",
        i18n: "MenuLevel2p1",
      },
      {
        url: null,
        name: "Menu Level 2.2",
        i18n: "MenuLevel2p2",
        submenu: [
          {
            url: null,
            name: "Menu Level 3.1",
            i18n: "MenuLevel3p1",
          },
          {
            url: null,
            name: "Menu Level 3.2",
            i18n: "MenuLevel3p2",
          },
        ]
      },
    ]
  },
]
