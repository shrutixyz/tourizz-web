export const resources = {
    en: {
      translation: {
        '20547967': 'Signature order (values generated by assembling URL parameters earlier)',
        '16e758e8': 'Generate Ephemeral Key Pair',
        '9b8b5398': 'Fetch JWT',
        '8adf5b45': 'Decode JWT',
        '8b72e7cd': 'Generate Salt',
        '66f6b490': 'Generate user Sui address',
        af802c7a: 'Fetch ZK Proof',
        c649dd70: 'Assemble zkLogin signature',
        '47b83f4e': ' From OpenID Provider',
        fb399be8: 'Needed for assembling zkLogin signature later',
        '0a710e64': 'User address determined by JWT and Salt together',
        '32255d31': 'Transaction signing requires ZK Proof',
        '8f2433d9': 'Submit Transaction',
        '431375b3': 'Step 1: Generate Ephemeral Key Pair',
        '62a0a307': 'The ephemeral key pair is used to sign the <1>TransactionBlock</1>',
        '9ec629a8': 'Stored in the browser session.',
        '4f04f1f8': 'Step 2: Fetch JWT',
        '56adebff': 'Required parameters:',
        e062b220: '(Obtained by applying for OpenID Service.)',
        ab92f814: '(App Url, configured in OpenID Service)',
        '2397bcd8': '(Generated through<1>ephemeralKeyPair</1> <2>maxEpoch</2> \n' +
          '      <3>randomness</3>)',
        '4274e146': 'Ephemeral key pair generated in the previous step',
        bf54d75b: 'Validity period of the ephemeral key pair',
        '4a7add7c': 'Randomness',
        '3a96f638': 'Fetch current Epoch (via Sui Client)',
        '6d47d563': 'Current Epoch:',
        '6a747813': 'Assuming the validity period is set to 10 Epochs, then:',
        '2e2913c8': 'Generate randomness',
        ef410d70: 'Step 3: Decode JWT (needed for assembling zkLogin signature later)',
        c20d7af6: 'Issuer',
        e9286432: 'JWT Consumer (CLIENT_ID)',
        '0ac23a36': 'Subject (user identifier, unique for each user)',
        '060c9525': 'Issued At',
        '5bbacff6': 'Issued Time',
        '3caf36d5': 'Expiration Time',
        '64ab7f15': 'JWT ID',
        b7c54098: "Step 4: Generate User's Salt",
        ec71ef53: 'User Salt is used to eliminate the one-to-one correspondence between the OAuth identifier (sub) and the on-chain Sui address, avoiding linking Web2 credentials with Web3 credentials.',
        cb63dedd: "Therefore, it is essential to safeguard the Salt. If lost, users won't be able to recover the address generated with the current Salt.",
        c4a666f0: "<1>Where to Save:</1><2>1. Ask the user to remember (send to user's email)</2><3>2. Store on the client side (browser)</3><3>3. Save in the APP Backend database, corresponding one-to-one with UID</3>",
        '2fb333f5': "Step 5: Generate User's Sui Address",
        e05797f4: "The user's Sui address is determined by <1>sub</1>,<1>iss</1>,<1>aud</1> and <1>user_salt</1> together. For the same JWT, <1>sub</1>, <1>iss</1>, and <1>aud</1> will not change with each login.",
        c9bbf457: 'Generate Sui Address',
        '51e8ceeb': 'Step 6: Fetch ZK Proof (Groth16)',
        '446760ac': 'This is the proof (ZK Proof) for the ephemeral key pair, used to demonstrate the validity of the ephemeral key pair.',
        c5c9e603: '1. First, generate the extended ephemeral public key as input for the ZKP.',
        '71c429d2': 'Generate the extended ephemeral public key',
        '16ebd660': 'Use the generated extended ephemeral public key (extendedEphemeralPublicKey) to generate ZK Proof. SUI provides a backend service (or you can run a Docker).',
        '33893c96': 'Fetch ZK Proof',
        acf1b947: 'Step 7: Assemble zkLogin signature and submit the transaction',
        d58c9e1e: 'Each ZK Proof is associated with an ephemeral key pair. Stored in the appropriate location, it can be reused as proof to sign any number of transactions until the ephemeral key pair expires.',
        '6591b962': 'Before executing the transaction, please recharge zkLogin with a small amount of SUI as the gas fee for initiating the transaction.'
      },
    },
    zh: {
      translation: {
        '20547967': '签名顺序（前面组装URL参数生成的值）',
        '16e758e8': '生成临时秘钥对',
        '9b8b5398': '获取JWT',
        '8adf5b45': 'Decode JWT',
        '8b72e7cd': '生成用户的 Salt',
        '66f6b490': '获取用户的 Sui 地址',
        af802c7a: '获取 ZK Proof',
        c649dd70: '组装 zkLogin 签名',
        '47b83f4e': ' 来自 OpenID Provider',
        fb399be8: '后续组装zkLogin签名时需要用到',
        '0a710e64': '用户地址由 JWT 和 Salt 共同决定',
        '32255d31': '交易签名需要 ZK Proof',
        '8f2433d9': '提交交易',
        '431375b3': '第一步：生成临时秘钥对（ephemeralKeyPair）',
        '62a0a307': '临时秘钥对用来对<1>TransactionBlock</1>进行签名',
        '9ec629a8': '储存在浏览器会话中',
        '4f04f1f8': '第二步：获取JWT',
        '56adebff': '所需参数：',
        e062b220: '（申请 OpenID Service 服务获得）',
        ab92f814: '（App Url，在 OpenID Service 配置）',
        '2397bcd8': '（通过 <1>ephemeralKeyPair</1> <2>maxEpoch</2> \n      <3>randomness</3> 生成）',
        '4274e146': '上一步生成的临时秘钥对',
        bf54d75b: '临时秘钥对的有效期',
        '4a7add7c': '随机种子',
        '3a96f638': '获取当前Epoch (通过Sui Client)',
        '6d47d563': '当前Epoch:',
        '6a747813': '假设设置有效期为10个 Epoch，则：',
        '2e2913c8': '生成随机种子',
        ef410d70: '第三步：Decode JWT (后续组装 zkLogin 签名时需要用到)',
        c20d7af6: '签发人',
        e9286432: '使用者 (CLIENT_ID)',
        '0ac23a36': '主体 （用户标识符，每个用户都不一样）',
        '060c9525': '生效时间',
        '5bbacff6': '签发时间',
        '3caf36d5': '过期时间',
        '64ab7f15': 'JWT编号',
        b7c54098: '第四步：生成用户的 Salt',
        ec71ef53: '用户 Salt 用于消除 OAuth 标识符 （sub） 与链上 Sui 地址的一一对应关系，以避免将 Web2 凭证与 Web3 凭证链接。',
        cb63dedd: '因此必须保管好 Salt，丢失后用户则无法找回当前 Salt 生成的地址。',
        c4a666f0: '<1>保存在哪：</1>\n' +
          '      <1>1.要求用户记住(发送到用户邮箱)</1>\n' +
          '      <1>2.储存在客户端(浏览器)</1>\n' +
          '      <1>3.保存在APP Backend数据库，与UID一一对应</1>',
        '2fb333f5': '第五步：获取用户的 Sui 地址',
        e05797f4: '用户 Sui 地址由 <1>sub</1> 、 <1>iss</1> 、\n' +
          '      <1>aud</1> 和 <1>user_salt</1> 共同决定，对于同一个\n' +
          '      JWT，每次登陆时 <1>sub</1> 、 <1>iss</1> 、\n' +
          '      <1>aud</1> 都不会变。',
        c9bbf457: '生成 Sui 地址',
        '51e8ceeb': '第六步：获取ZK Proof (Groth16)',
        '446760ac': '这是对临时密钥对的证明（证明），用于证明临时密钥对有效。',
        c5c9e603: '1.首先，生成扩展的临时公钥，用作 ZKP 的输入。',
        '71c429d2': '生成扩展的临时公钥',
        '16ebd660': '使用生成临时的公钥扩展(extendedEphemeralPublicKey)来生成ZK Proof，SUI 提供了一个 backend service（也可以 Run 一个 Docker）',
        '33893c96': '获取ZK Proof',
        acf1b947: '第七步：组装 zkLogin 签名并提交交易',
        d58c9e1e: '每个 ZK 证明都与一个临时密钥对相关联。储存在适当位置，可以重复作为证明用来签署任意数量的交易，直到临时密钥对过期',
        '6591b962': '执行交易前，请给 zkLogin 充值少量的 SUI 作为发起交易的 gas fee'
      },
    },
  };