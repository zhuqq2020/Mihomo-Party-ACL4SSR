// ============ 配置区域 ============
//特点:1、无dns泄露
//	   2、动态显示自动选择里面的国家或地区分组
//	   3、分流规则完善（应该吧，佬友们火眼金睛看看）
//	   4、微信输入法直连（不直连跨设备复制粘贴会出问题，手机端记得直连哦）
//	   5、5个核心代理分组(其他隐藏)

const proxyName = "🛜代理选择";

// 分流规则开关
const ruleOptions = {
  apple: true,        // 苹果服务
  microsoft: true,    // 微软服务
  github: true,       // Github
  google: true,       // Google服务
  openai: true,       // AI服务
  spotify: true,      // Spotify
  youtube: true,      // YouTube
  bahamut: true,      // 巴哈姆特
  netflix: true,      // Netflix
  tiktok: true,       // TikTok
  disney: true,       // Disney+
  pixiv: true,        // Pixiv
  hbo: true,          // HBO
  'media-hk': true,   // 港澳台媒体
  biliintl: true,     // 哔哩哔哩东南亚
  hulu: true,         // Hulu
  primevideo: true,   // Amazon Prime
  telegram: true,     // Telegram
  line: true,         // Line
  whatsapp: true,     // WhatsApp
  games: true,        // 游戏平台
};

// 热门国家地区配置(用于节点分类)
const regionDefinitions = [
  // 亚洲热门
  { name: '🇭🇰香港', regex: /香港|港|HK|Hong.*Kong|🇭🇰/i },
  { name: '🇹🇼台湾', regex: /台湾|台|TW|Taiwan|🇹🇼/i },
  { name: '🇯🇵日本', regex: /日本|日|JP|Japan|🇯🇵/i },
  { name: '🇰🇷韩国', regex: /韩国|韩|KR|Korea|🇰🇷/i },
  { name: '🇸🇬新加坡', regex: /新加坡|狮城|SG|Singapore|🇸🇬/i },
  
  // 北美
  { name: '🇺🇸美国', regex: /(?!.*aus)(?=.*(美|🇺🇸|us(?!t)|usa|american|united states)).*/i },
  { name: '🇨🇦加拿大', regex: /加拿大|🇨🇦|CA|Canada/i },
  
  // 欧洲热门
  { name: '🇬🇧英国', regex: /英国|英|🇬🇧|UK|United.*Kingdom|Britain/i },
  { name: '🇩🇪德国', regex: /德国|德|🇩🇪|DE|Germany/i },
  { name: '🇫🇷法国', regex: /法国|法|🇫🇷|FR|France/i },
  { name: '🇳🇱荷兰', regex: /荷兰|🇳🇱|NL|Netherlands/i },
  { name: '🇷🇺俄罗斯', regex: /俄罗斯|俄|🇷🇺|RU|Russia/i },
  
  // 其他热门
  { name: '🇹🇷土耳其', regex: /土耳其|🇹🇷|TR|Turkey/i },
  { name: '🇦🇺澳大利亚', regex: /澳大利亚|澳|🇦🇺|AU|Australia|Sydney/i },
  { name: '🇦🇷阿根廷', regex: /阿根廷|🇦🇷|AR|Argentina/i },
  { name: '🇮🇳印度', regex: /印度|🇮🇳|IN|India/i },
  { name: '🇹🇭泰国', regex: /泰国|🇹🇭|TH|Thailand/i },
  { name: '🇵🇭菲律宾', regex: /菲律宾|🇵🇭|PH|Philippines/i },
  { name: '🇲🇾马来西亚', regex: /马来|🇲🇾|MY|Malaysia/i },
  { name: '🇦🇪阿联酋', regex: /阿联酋|迪拜|🇦🇪|AE|UAE|Dubai/i },
];

// ============ 服务规则配置 ============

const serviceConfigs = [
  {
    key: 'openai',
    name: '🤖AI服务',
    url: 'https://chat.openai.com/cdn-cgi/trace',
    rules: [
      'GEOSITE,jetbrains-ai,🤖AI服务',
      'GEOSITE,category-ai-!cn,🤖AI服务',
      'GEOSITE,category-ai-chat-!cn,🤖AI服务',
      'DOMAIN-SUFFIX,meta.ai,🤖AI服务',
      'DOMAIN-SUFFIX,meta.com,🤖AI服务'
    ]
  },
  {
    key: 'youtube',
    name: '📹YouTube',
    url: 'https://www.youtube.com/s/desktop/494dd881/img/favicon.ico',
    rules: ['GEOSITE,youtube,📹YouTube']
  },
  {
    key: 'media-hk',
    name: '🎬港澳台媒体',
    url: 'https://viu.tv/',
    rules: [
      'GEOSITE,tvb,🎬港澳台媒体',
      'GEOSITE,hkt,🎬港澳台媒体',
      'GEOSITE,hkopentv,🎬港澳台媒体'
    ]
  },
  {
    key: 'biliintl',
    name: '📺哔哩东南亚',
    url: 'https://www.bilibili.tv/',
    rules: ['GEOSITE,biliintl,📺哔哩东南亚']
  },
  {
    key: 'bahamut',
    name: '🎮巴哈姆特',
    url: 'https://ani.gamer.com.tw/ajax/getdeviceid.php',
    rules: ['GEOSITE,bahamut,🎮巴哈姆特']
  },
  {
    key: 'netflix',
    name: '🎥Netflix',
    url: 'https://api.fast.com/netflix/speedtest/v2?https=true',
    rules: ['GEOSITE,netflix,🎥Netflix']
  },
  {
    key: 'disney',
    name: '🏰Disney+',
    url: 'https://disney.api.edge.bamgrid.com/devices',
    rules: ['GEOSITE,disney,🏰Disney+']
  },
  {
    key: 'tiktok',
    name: '🎵TikTok',
    url: 'https://www.tiktok.com/',
    rules: ['GEOSITE,tiktok,🎵TikTok']
  },
  {
    key: 'spotify',
    name: '🎧Spotify',
    url: 'http://spclient.wg.spotify.com/signup/public/v1/account',
    rules: ['GEOSITE,spotify,🎧Spotify']
  },
  {
    key: 'pixiv',
    name: '🎨Pixiv',
    rules: ['GEOSITE,pixiv,🎨Pixiv']
  },
  {
    key: 'hbo',
    name: '📽️HBO',
    url: 'https://www.hbo.com/favicon.ico',
    rules: ['GEOSITE,hbo,📽️HBO']
  },
  {
    key: 'primevideo',
    name: '📦Prime Video',
    rules: ['GEOSITE,primevideo,📦Prime Video']
  },
  {
    key: 'hulu',
    name: '🟢Hulu',
    rules: ['GEOSITE,hulu,🟢Hulu']
  },
  {
    key: 'telegram',
    name: '✈️Telegram',
    url: 'http://www.telegram.org/img/website_icon.svg',
    rules: ['GEOIP,telegram,✈️Telegram']
  },
  {
    key: 'whatsapp',
    name: '💬WhatsApp',
    url: 'https://web.whatsapp.com/data/manifest.json',
    rules: ['GEOSITE,whatsapp,💬WhatsApp']
  },
  {
    key: 'line',
    name: '💚Line',
    url: 'https://line.me/page-data/app-data.json',
    rules: ['GEOSITE,line,💚Line']
  },
  {
    key: 'games',
    name: '🎮游戏平台',
    rules: [
      'GEOSITE,category-games@cn,DIRECT',
      'GEOSITE,category-games,🎮游戏平台'
    ]
  },
  {
    key: 'apple',
    name: '🍎苹果服务',
    url: 'http://www.apple.com/library/test/success.html',
    rules: ['GEOSITE,apple-cn,🍎苹果服务']
  },
  {
    key: 'google',
    name: '🔍Google',
    url: 'http://www.google.com/generate_204',
    rules: ['GEOSITE,google,🔍Google']
  },
  {
    key: 'github',
    name: '🐙Github',
    url: 'https://github.com/robots.txt',
    rules: ['GEOSITE,github,🐙Github']
  },
  {
    key: 'microsoft',
    name: '🪟微软服务',
    url: 'http://www.msftconnecttest.com/connecttest.txt',
    rules: [
      'GEOSITE,microsoft@cn,DIRECT',
      'GEOSITE,microsoft,🪟微软服务'
    ]
  }
];

// Rule Providers 通用配置
const ruleProviderCommon = {
  type: 'http',
  format: 'yaml',
  interval: 86400
};

const ruleProviders = {};

// ============ DNS配置 ============

const dnsConfig = {
  enable: true,
  'default-nameserver': [
    'tls://223.5.5.5',
    'tls://223.6.6.6'
  ],
  nameserver: [
    'https://cloudflare-dns.com/dns-query',
    'https://dns.google/dns-query'
  ],
  'proxy-server-nameserver': [
    'https://dns.alidns.com/dns-query',
    'https://doh.pub/dns-query'
  ],
  'direct-nameserver': [
    'https://dns.alidns.com/dns-query',
    'https://doh.pub/dns-query'
  ],
  'respect-rules': true
};

// ============ 主函数 ============

function main(params) {
  if (!params.proxies || params.proxies.length === 0) {
    throw new Error('配置文件中未找到任何代理');
  }
  
  overwriteDNS(params);
  overwriteRules(params);
  overwriteProxyGroups(params);
  
  return params;
}

// ============ DNS覆写 ============

function overwriteDNS(params) {
  params['dns'] = dnsConfig;
}

// ============ 规则覆写 ============

function overwriteRules(params) {
  const rules = [
    // 微信输入法直连
    'PROCESS-NAME,wetype_installer.exe,DIRECT',
    'PROCESS-NAME,wetype_renderer.exe,DIRECT',
    'PROCESS-NAME,wetype_server.exe,DIRECT',
    'PROCESS-NAME,wetype_service.exe,DIRECT',
    'PROCESS-NAME,wetype_update.exe,DIRECT',
    
    // 特定直连规则
    'DOMAIN-SUFFIX,bilibili.com,DIRECT',
    
    // 本地和私有网络
    'GEOSITE,private,DIRECT',
    'GEOIP,private,DIRECT,no-resolve',
    'GEOIP,LAN,DIRECT,no-resolve',
  ];
  
  // 添加服务规则
  serviceConfigs.forEach(svc => {
    if (ruleOptions[svc.key]) {
      rules.push(...svc.rules);
    }
  });
  
  // 国内网站直连
  rules.push(
    'GEOIP,cn,DIRECT,no-resolve'
  );
  
  // 其他流量走代理
  rules.push('MATCH,' + proxyName);
  
  params['rules'] = rules;
  params['rule-providers'] = ruleProviders;
}

// ============ 代理组覆写 ============

function overwriteProxyGroups(params) {
  const allProxies = params.proxies.map(e => e.name);
  
  // 按地区分类节点
  const regionGroups = {};
  regionDefinitions.forEach(r => {
    regionGroups[r.name] = [];
  });
  
  // 分类节点
  allProxies.forEach(proxyName => {
    let matched = false;
    for (const region of regionDefinitions) {
      if (region.regex.test(proxyName)) {
        regionGroups[region.name].push(proxyName);
        matched = true;
        break;
      }
    }
  });
  
  // 为自动选择准备节点列表(按地区排序)
  const sortedProxies = [];
  regionDefinitions.forEach(r => {
    if (regionGroups[r.name].length > 0) {
      sortedProxies.push(...regionGroups[r.name]);
    }
  });
  
  // 如果有节点没被分类,添加到末尾
  allProxies.forEach(proxy => {
    if (!sortedProxies.includes(proxy)) {
      sortedProxies.push(proxy);
    }
  });
  
  // 构建5个核心策略组(按指定顺序)
  const groups = [
    {
      name: proxyName,
      type: 'select',
      proxies: [
        '🤖自动选择',
        '🎯手动选择',
        '🔀负载均衡(散列)',
        '🔁负载均衡(轮询)',
        'DIRECT'
      ]
    },
    {
      name: '🤖自动选择',
      type: 'url-test',
      url: 'http://www.gstatic.com/generate_204',
      interval: 300,
      tolerance: 50,
      proxies: sortedProxies
    },
    {
      name: '🎯手动选择',
      type: 'select',
      proxies: [...sortedProxies, 'DIRECT']
    },
    {
      name: '🔀负载均衡(散列)',
      type: 'load-balance',
      url: 'http://www.gstatic.com/generate_204',
      interval: 300,
      'max-failed-times': 3,
      strategy: 'consistent-hashing',
      lazy: true,
      proxies: sortedProxies
    },
    {
      name: '🔁负载均衡(轮询)',
      type: 'load-balance',
      url: 'http://www.gstatic.com/generate_204',
      interval: 300,
      'max-failed-times': 3,
      strategy: 'round-robin',
      lazy: true,
      proxies: sortedProxies
    }
  ];
  
  // 添加服务专用策略组(hidden)
  serviceConfigs.forEach(svc => {
    if (ruleOptions[svc.key]) {
      groups.push({
        name: svc.name,
        type: 'select',
        proxies: [proxyName, 'DIRECT'],
        url: svc.url,
        hidden: true  // 隐藏服务分组
      });
    }
  });
  
  params['proxy-groups'] = groups;
}


