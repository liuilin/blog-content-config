"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=(e=require("crypto"))&&"object"==typeof e&&"default"in e?e.default:e,r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function i(e,t){return e(t={exports:{}},t.exports),t.exports}var n=i((function(e,i){var n;e.exports=(n=n||function(e,i){var n;if("undefined"!=typeof window&&window.crypto&&(n=window.crypto),!n&&"undefined"!=typeof window&&window.msCrypto&&(n=window.msCrypto),!n&&void 0!==r&&r.crypto&&(n=r.crypto),!n)try{n=t}catch(e){}var o=function(){if(n){if("function"==typeof n.getRandomValues)try{return n.getRandomValues(new Uint32Array(1))[0]}catch(e){}if("function"==typeof n.randomBytes)try{return n.randomBytes(4).readInt32LE()}catch(e){}}throw new Error("Native crypto module could not be used to get secure random number.")},s=Object.create||function(){function e(){}return function(t){var r;return e.prototype=t,r=new e,e.prototype=null,r}}(),c={},a=c.lib={},h=a.Base={extend:function(e){var t=s(this);return e&&t.mixIn(e),t.hasOwnProperty("init")&&this.init!==t.init||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},f=a.WordArray=h.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=null!=t?t:4*e.length},toString:function(e){return(e||d).stringify(this)},concat:function(e){var t=this.words,r=e.words,i=this.sigBytes,n=e.sigBytes;if(this.clamp(),i%4)for(var o=0;o<n;o++){var s=r[o>>>2]>>>24-o%4*8&255;t[i+o>>>2]|=s<<24-(i+o)%4*8}else for(o=0;o<n;o+=4)t[i+o>>>2]=r[o>>>2];return this.sigBytes+=n,this},clamp:function(){var t=this.words,r=this.sigBytes;t[r>>>2]&=4294967295<<32-r%4*8,t.length=e.ceil(r/4)},clone:function(){var e=h.clone.call(this);return e.words=this.words.slice(0),e},random:function(e){for(var t=[],r=0;r<e;r+=4)t.push(o());return new f.init(t,e)}}),u=c.enc={},d=u.Hex={stringify:function(e){for(var t=e.words,r=e.sigBytes,i=[],n=0;n<r;n++){var o=t[n>>>2]>>>24-n%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(e){for(var t=e.length,r=[],i=0;i<t;i+=2)r[i>>>3]|=parseInt(e.substr(i,2),16)<<24-i%8*4;return new f.init(r,t/2)}},p=u.Latin1={stringify:function(e){for(var t=e.words,r=e.sigBytes,i=[],n=0;n<r;n++){var o=t[n>>>2]>>>24-n%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(e){for(var t=e.length,r=[],i=0;i<t;i++)r[i>>>2]|=(255&e.charCodeAt(i))<<24-i%4*8;return new f.init(r,t)}},l=u.Utf8={stringify:function(e){try{return decodeURIComponent(escape(p.stringify(e)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(e){return p.parse(unescape(encodeURIComponent(e)))}},_=a.BufferedBlockAlgorithm=h.extend({reset:function(){this._data=new f.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=l.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var r,i=this._data,n=i.words,o=i.sigBytes,s=this.blockSize,c=o/(4*s),a=(c=t?e.ceil(c):e.max((0|c)-this._minBufferSize,0))*s,h=e.min(4*a,o);if(a){for(var u=0;u<a;u+=s)this._doProcessBlock(n,u);r=n.splice(0,a),i.sigBytes-=h}return new f.init(r,h)},clone:function(){var e=h.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0}),y=(a.Hasher=_.extend({cfg:h.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){_.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,r){return new e.init(r).finalize(t)}},_createHmacHelper:function(e){return function(t,r){return new y.HMAC.init(e,r).finalize(t)}}}),c.algo={});return c}(Math),n)})),o=(i((function(e,t){var r,i,o;e.exports=(i=(r=o=n).lib.WordArray,r.enc.Base64={stringify:function(e){var t=e.words,r=e.sigBytes,i=this._map;e.clamp();for(var n=[],o=0;o<r;o+=3)for(var s=(t[o>>>2]>>>24-o%4*8&255)<<16|(t[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|t[o+2>>>2]>>>24-(o+2)%4*8&255,c=0;c<4&&o+.75*c<r;c++)n.push(i.charAt(s>>>6*(3-c)&63));var a=i.charAt(64);if(a)for(;n.length%4;)n.push(a);return n.join("")},parse:function(e){var t=e.length,r=this._map,n=this._reverseMap;if(!n){n=this._reverseMap=[];for(var o=0;o<r.length;o++)n[r.charCodeAt(o)]=o}var s=r.charAt(64);if(s){var c=e.indexOf(s);-1!==c&&(t=c)}return function(e,t,r){for(var n=[],o=0,s=0;s<t;s++)if(s%4){var c=r[e.charCodeAt(s-1)]<<s%4*2,a=r[e.charCodeAt(s)]>>>6-s%4*2,h=c|a;n[o>>>2]|=h<<24-o%4*8,o++}return i.create(n,o)}(e,t,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},o.enc.Base64)})),i((function(e,t){var r;e.exports=(r=n,function(e){var t=r,i=t.lib,n=i.WordArray,o=i.Hasher,s=t.algo,c=[];!function(){for(var t=0;t<64;t++)c[t]=4294967296*e.abs(e.sin(t+1))|0}();var a=s.MD5=o.extend({_doReset:function(){this._hash=new n.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var r=0;r<16;r++){var i=t+r,n=e[i];e[i]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8)}var o=this._hash.words,s=e[t+0],a=e[t+1],p=e[t+2],l=e[t+3],_=e[t+4],y=e[t+5],v=e[t+6],g=e[t+7],x=e[t+8],m=e[t+9],B=e[t+10],w=e[t+11],k=e[t+12],E=e[t+13],S=e[t+14],C=e[t+15],z=o[0],M=o[1],A=o[2],R=o[3];z=h(z,M,A,R,s,7,c[0]),R=h(R,z,M,A,a,12,c[1]),A=h(A,R,z,M,p,17,c[2]),M=h(M,A,R,z,l,22,c[3]),z=h(z,M,A,R,_,7,c[4]),R=h(R,z,M,A,y,12,c[5]),A=h(A,R,z,M,v,17,c[6]),M=h(M,A,R,z,g,22,c[7]),z=h(z,M,A,R,x,7,c[8]),R=h(R,z,M,A,m,12,c[9]),A=h(A,R,z,M,B,17,c[10]),M=h(M,A,R,z,w,22,c[11]),z=h(z,M,A,R,k,7,c[12]),R=h(R,z,M,A,E,12,c[13]),A=h(A,R,z,M,S,17,c[14]),z=f(z,M=h(M,A,R,z,C,22,c[15]),A,R,a,5,c[16]),R=f(R,z,M,A,v,9,c[17]),A=f(A,R,z,M,w,14,c[18]),M=f(M,A,R,z,s,20,c[19]),z=f(z,M,A,R,y,5,c[20]),R=f(R,z,M,A,B,9,c[21]),A=f(A,R,z,M,C,14,c[22]),M=f(M,A,R,z,_,20,c[23]),z=f(z,M,A,R,m,5,c[24]),R=f(R,z,M,A,S,9,c[25]),A=f(A,R,z,M,l,14,c[26]),M=f(M,A,R,z,x,20,c[27]),z=f(z,M,A,R,E,5,c[28]),R=f(R,z,M,A,p,9,c[29]),A=f(A,R,z,M,g,14,c[30]),z=u(z,M=f(M,A,R,z,k,20,c[31]),A,R,y,4,c[32]),R=u(R,z,M,A,x,11,c[33]),A=u(A,R,z,M,w,16,c[34]),M=u(M,A,R,z,S,23,c[35]),z=u(z,M,A,R,a,4,c[36]),R=u(R,z,M,A,_,11,c[37]),A=u(A,R,z,M,g,16,c[38]),M=u(M,A,R,z,B,23,c[39]),z=u(z,M,A,R,E,4,c[40]),R=u(R,z,M,A,s,11,c[41]),A=u(A,R,z,M,l,16,c[42]),M=u(M,A,R,z,v,23,c[43]),z=u(z,M,A,R,m,4,c[44]),R=u(R,z,M,A,k,11,c[45]),A=u(A,R,z,M,C,16,c[46]),z=d(z,M=u(M,A,R,z,p,23,c[47]),A,R,s,6,c[48]),R=d(R,z,M,A,g,10,c[49]),A=d(A,R,z,M,S,15,c[50]),M=d(M,A,R,z,y,21,c[51]),z=d(z,M,A,R,k,6,c[52]),R=d(R,z,M,A,l,10,c[53]),A=d(A,R,z,M,B,15,c[54]),M=d(M,A,R,z,a,21,c[55]),z=d(z,M,A,R,x,6,c[56]),R=d(R,z,M,A,C,10,c[57]),A=d(A,R,z,M,v,15,c[58]),M=d(M,A,R,z,E,21,c[59]),z=d(z,M,A,R,_,6,c[60]),R=d(R,z,M,A,w,10,c[61]),A=d(A,R,z,M,p,15,c[62]),M=d(M,A,R,z,m,21,c[63]),o[0]=o[0]+z|0,o[1]=o[1]+M|0,o[2]=o[2]+A|0,o[3]=o[3]+R|0},_doFinalize:function(){var t=this._data,r=t.words,i=8*this._nDataBytes,n=8*t.sigBytes;r[n>>>5]|=128<<24-n%32;var o=e.floor(i/4294967296),s=i;r[15+(n+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),r[14+(n+64>>>9<<4)]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),t.sigBytes=4*(r.length+1),this._process();for(var c=this._hash,a=c.words,h=0;h<4;h++){var f=a[h];a[h]=16711935&(f<<8|f>>>24)|4278255360&(f<<24|f>>>8)}return c},clone:function(){var e=o.clone.call(this);return e._hash=this._hash.clone(),e}});function h(e,t,r,i,n,o,s){var c=e+(t&r|~t&i)+n+s;return(c<<o|c>>>32-o)+t}function f(e,t,r,i,n,o,s){var c=e+(t&i|r&~i)+n+s;return(c<<o|c>>>32-o)+t}function u(e,t,r,i,n,o,s){var c=e+(t^r^i)+n+s;return(c<<o|c>>>32-o)+t}function d(e,t,r,i,n,o,s){var c=e+(r^(t|~i))+n+s;return(c<<o|c>>>32-o)+t}t.MD5=o._createHelper(a),t.HmacMD5=o._createHmacHelper(a)}(Math),r.MD5)})),i((function(e,t){var r,i,o,s,c,a,h,f;e.exports=(i=(r=f=n).lib,o=i.WordArray,s=i.Hasher,c=r.algo,a=[],h=c.SHA1=s.extend({_doReset:function(){this._hash=new o.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var r=this._hash.words,i=r[0],n=r[1],o=r[2],s=r[3],c=r[4],h=0;h<80;h++){if(h<16)a[h]=0|e[t+h];else{var f=a[h-3]^a[h-8]^a[h-14]^a[h-16];a[h]=f<<1|f>>>31}var u=(i<<5|i>>>27)+c+a[h];u+=h<20?1518500249+(n&o|~n&s):h<40?1859775393+(n^o^s):h<60?(n&o|n&s|o&s)-1894007588:(n^o^s)-899497514,c=s,s=o,o=n<<30|n>>>2,n=i,i=u}r[0]=r[0]+i|0,r[1]=r[1]+n|0,r[2]=r[2]+o|0,r[3]=r[3]+s|0,r[4]=r[4]+c|0},_doFinalize:function(){var e=this._data,t=e.words,r=8*this._nDataBytes,i=8*e.sigBytes;return t[i>>>5]|=128<<24-i%32,t[14+(i+64>>>9<<4)]=Math.floor(r/4294967296),t[15+(i+64>>>9<<4)]=r,e.sigBytes=4*t.length,this._process(),this._hash},clone:function(){var e=s.clone.call(this);return e._hash=this._hash.clone(),e}}),r.SHA1=s._createHelper(h),r.HmacSHA1=s._createHmacHelper(h),f.SHA1)})),i((function(e,t){var r,i,o;e.exports=(i=(r=n).lib.Base,o=r.enc.Utf8,void(r.algo.HMAC=i.extend({init:function(e,t){e=this._hasher=new e.init,"string"==typeof t&&(t=o.parse(t));var r=e.blockSize,i=4*r;t.sigBytes>i&&(t=e.finalize(t)),t.clamp();for(var n=this._oKey=t.clone(),s=this._iKey=t.clone(),c=n.words,a=s.words,h=0;h<r;h++)c[h]^=1549556828,a[h]^=909522486;n.sigBytes=s.sigBytes=i,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher,r=t.finalize(e);return t.reset(),t.finalize(this._oKey.clone().concat(r))}})))})),i((function(e,t){var r,i,o,s,c,a,h,f;e.exports=(i=(r=f=n).lib,o=i.Base,s=i.WordArray,c=r.algo,a=c.MD5,h=c.EvpKDF=o.extend({cfg:o.extend({keySize:4,hasher:a,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var r,i=this.cfg,n=i.hasher.create(),o=s.create(),c=o.words,a=i.keySize,h=i.iterations;c.length<a;){r&&n.update(r),r=n.update(e).finalize(t),n.reset();for(var f=1;f<h;f++)r=n.finalize(r),n.reset();o.concat(r)}return o.sigBytes=4*a,o}}),r.EvpKDF=function(e,t,r){return h.create(r).compute(e,t)},f.EvpKDF)})),i((function(e,t){var r,i,o,s,c,a,h,f,u,d,p,l,_,y,v,g,x,m,B;e.exports=void((r=n).lib.Cipher||(i=r,o=i.lib,s=o.Base,c=o.WordArray,a=o.BufferedBlockAlgorithm,h=i.enc,h.Utf8,f=h.Base64,u=i.algo.EvpKDF,d=o.Cipher=a.extend({cfg:s.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,r){this.cfg=this.cfg.extend(r),this._xformMode=e,this._key=t,this.reset()},reset:function(){a.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function e(e){return"string"==typeof e?B:x}return function(t){return{encrypt:function(r,i,n){return e(i).encrypt(t,r,i,n)},decrypt:function(r,i,n){return e(i).decrypt(t,r,i,n)}}}}()}),o.StreamCipher=d.extend({_doFinalize:function(){return this._process(!0)},blockSize:1}),p=i.mode={},l=o.BlockCipherMode=s.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}}),_=p.CBC=function(){var e=l.extend();function t(e,t,r){var i,n=this._iv;n?(i=n,this._iv=void 0):i=this._prevBlock;for(var o=0;o<r;o++)e[t+o]^=i[o]}return e.Encryptor=e.extend({processBlock:function(e,r){var i=this._cipher,n=i.blockSize;t.call(this,e,r,n),i.encryptBlock(e,r),this._prevBlock=e.slice(r,r+n)}}),e.Decryptor=e.extend({processBlock:function(e,r){var i=this._cipher,n=i.blockSize,o=e.slice(r,r+n);i.decryptBlock(e,r),t.call(this,e,r,n),this._prevBlock=o}}),e}(),y=(i.pad={}).Pkcs7={pad:function(e,t){for(var r=4*t,i=r-e.sigBytes%r,n=i<<24|i<<16|i<<8|i,o=[],s=0;s<i;s+=4)o.push(n);var a=c.create(o,i);e.concat(a)},unpad:function(e){var t=255&e.words[e.sigBytes-1>>>2];e.sigBytes-=t}},o.BlockCipher=d.extend({cfg:d.cfg.extend({mode:_,padding:y}),reset:function(){var e;d.reset.call(this);var t=this.cfg,r=t.iv,i=t.mode;this._xformMode==this._ENC_XFORM_MODE?e=i.createEncryptor:(e=i.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==e?this._mode.init(this,r&&r.words):(this._mode=e.call(i,this,r&&r.words),this._mode.__creator=e)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e,t=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(t.pad(this._data,this.blockSize),e=this._process(!0)):(e=this._process(!0),t.unpad(e)),e},blockSize:4}),v=o.CipherParams=s.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),g=(i.format={}).OpenSSL={stringify:function(e){var t=e.ciphertext,r=e.salt;return(r?c.create([1398893684,1701076831]).concat(r).concat(t):t).toString(f)},parse:function(e){var t,r=f.parse(e),i=r.words;return 1398893684==i[0]&&1701076831==i[1]&&(t=c.create(i.slice(2,4)),i.splice(0,4),r.sigBytes-=16),v.create({ciphertext:r,salt:t})}},x=o.SerializableCipher=s.extend({cfg:s.extend({format:g}),encrypt:function(e,t,r,i){i=this.cfg.extend(i);var n=e.createEncryptor(r,i),o=n.finalize(t),s=n.cfg;return v.create({ciphertext:o,key:r,iv:s.iv,algorithm:e,mode:s.mode,padding:s.padding,blockSize:e.blockSize,formatter:i.format})},decrypt:function(e,t,r,i){return i=this.cfg.extend(i),t=this._parse(t,i.format),e.createDecryptor(r,i).finalize(t.ciphertext)},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}}),m=(i.kdf={}).OpenSSL={execute:function(e,t,r,i){i||(i=c.random(8));var n=u.create({keySize:t+r}).compute(e,i),o=c.create(n.words.slice(t),4*r);return n.sigBytes=4*t,v.create({key:n,iv:o,salt:i})}},B=o.PasswordBasedCipher=x.extend({cfg:x.cfg.extend({kdf:m}),encrypt:function(e,t,r,i){var n=(i=this.cfg.extend(i)).kdf.execute(r,e.keySize,e.ivSize);i.iv=n.iv;var o=x.encrypt.call(this,e,t,n.key,i);return o.mixIn(n),o},decrypt:function(e,t,r,i){i=this.cfg.extend(i),t=this._parse(t,i.format);var n=i.kdf.execute(r,e.keySize,e.ivSize,t.salt);return i.iv=n.iv,x.decrypt.call(this,e,t,n.key,i)}})))})),i((function(e,t){var r;e.exports=(r=n,function(){var e=r,t=e.lib.BlockCipher,i=e.algo,n=[],o=[],s=[],c=[],a=[],h=[],f=[],u=[],d=[],p=[];!function(){for(var e=[],t=0;t<256;t++)e[t]=t<128?t<<1:t<<1^283;var r=0,i=0;for(t=0;t<256;t++){var l=i^i<<1^i<<2^i<<3^i<<4;l=l>>>8^255&l^99,n[r]=l,o[l]=r;var _=e[r],y=e[_],v=e[y],g=257*e[l]^16843008*l;s[r]=g<<24|g>>>8,c[r]=g<<16|g>>>16,a[r]=g<<8|g>>>24,h[r]=g,g=16843009*v^65537*y^257*_^16843008*r,f[l]=g<<24|g>>>8,u[l]=g<<16|g>>>16,d[l]=g<<8|g>>>24,p[l]=g,r?(r=_^e[e[e[v^_]]],i^=e[e[i]]):r=i=1}}();var l=[0,1,2,4,8,16,32,64,128,27,54],_=i.AES=t.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var e=this._keyPriorReset=this._key,t=e.words,r=e.sigBytes/4,i=4*((this._nRounds=r+6)+1),o=this._keySchedule=[],s=0;s<i;s++)s<r?o[s]=t[s]:(h=o[s-1],s%r?r>6&&s%r==4&&(h=n[h>>>24]<<24|n[h>>>16&255]<<16|n[h>>>8&255]<<8|n[255&h]):(h=n[(h=h<<8|h>>>24)>>>24]<<24|n[h>>>16&255]<<16|n[h>>>8&255]<<8|n[255&h],h^=l[s/r|0]<<24),o[s]=o[s-r]^h);for(var c=this._invKeySchedule=[],a=0;a<i;a++){if(s=i-a,a%4)var h=o[s];else h=o[s-4];c[a]=a<4||s<=4?h:f[n[h>>>24]]^u[n[h>>>16&255]]^d[n[h>>>8&255]]^p[n[255&h]]}}},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,s,c,a,h,n)},decryptBlock:function(e,t){var r=e[t+1];e[t+1]=e[t+3],e[t+3]=r,this._doCryptBlock(e,t,this._invKeySchedule,f,u,d,p,o),r=e[t+1],e[t+1]=e[t+3],e[t+3]=r},_doCryptBlock:function(e,t,r,i,n,o,s,c){for(var a=this._nRounds,h=e[t]^r[0],f=e[t+1]^r[1],u=e[t+2]^r[2],d=e[t+3]^r[3],p=4,l=1;l<a;l++){var _=i[h>>>24]^n[f>>>16&255]^o[u>>>8&255]^s[255&d]^r[p++],y=i[f>>>24]^n[u>>>16&255]^o[d>>>8&255]^s[255&h]^r[p++],v=i[u>>>24]^n[d>>>16&255]^o[h>>>8&255]^s[255&f]^r[p++],g=i[d>>>24]^n[h>>>16&255]^o[f>>>8&255]^s[255&u]^r[p++];h=_,f=y,u=v,d=g}_=(c[h>>>24]<<24|c[f>>>16&255]<<16|c[u>>>8&255]<<8|c[255&d])^r[p++],y=(c[f>>>24]<<24|c[u>>>16&255]<<16|c[d>>>8&255]<<8|c[255&h])^r[p++],v=(c[u>>>24]<<24|c[d>>>16&255]<<16|c[h>>>8&255]<<8|c[255&f])^r[p++],g=(c[d>>>24]<<24|c[h>>>16&255]<<16|c[f>>>8&255]<<8|c[255&u])^r[p++],e[t]=_,e[t+1]=y,e[t+2]=v,e[t+3]=g},keySize:8});e.AES=t._createHelper(_)}(),r.AES)})));const s=require(process.cwd()+"/node_modules/markdown-it-container");exports.exec=function(e,t={},r){e.extend.filter.register("after_post_render",e=>{if(["page","post"].includes(e.layout)&&(e.content=e.content.replace(/__CIPHER\|SRT:(.*?)\|PLR:(.*?)__([\s\S]*?)__CIPHEREND__/g,(e,t,r,i)=>`<is-cipher placeholder="${r}">${o.encrypt(i,t)}</is-cipher>`),e.secret)){const{placeholder:r=t.placeholder,excerpt:i=t.excerpt}=e.cipher||{};e.content=`<is-cipher placeholder="${r}">${o.encrypt(e.content,String(e.secret))}</is-cipher>`,e.toc&&delete e.toc,e.excerpt&&(e.excerpt=i)}},11),e.extend.filter.register("inside:renderer",(function(e){e.use(s,"cipher",{render(e,t,r,i,n){const o=e[t].info.trim().slice(7).split(" "),s=o[0].trim(),c=(o[1]||"").trim();return 1===e[t].nesting?`__CIPHER|SRT:${s}|PLR:${c}__`:"__CIPHEREND__"}})})),e.extend.generator.register("cipher.d210d59f.js",()=>({path:"cipher.d210d59f.js",data:"!function(){\"use strict\";function t(e){return(t=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t})(e)}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(){if(\"undefined\"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if(\"function\"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function o(t,e,n){return(o=i()?Reflect.construct:function(t,e,n){var i=[null];i.push.apply(i,e);var o=new(Function.bind.apply(t,i));return n&&r(o,n.prototype),o}).apply(null,arguments)}function c(t){var e=\"function\"==typeof Map?new Map:void 0;return(c=function(t){if(null===t||(i=t,-1===Function.toString.call(i).indexOf(\"[native code]\")))return t;var i;if(\"function\"!=typeof t)throw new TypeError(\"Super expression must either be null or a function\");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,c)}function c(){return o(t,arguments,n(this).constructor)}return c.prototype=Object.create(t.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),r(c,t)})(t)}function a(t,e){return!e||\"object\"!=typeof e&&\"function\"!=typeof e?function(t){if(void 0===t)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return t}(t):e}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var u=function(e){var n=t(e);return null!=e&&(\"object\"==n||\"function\"==n)},f=\"undefined\"!=typeof globalThis?globalThis:\"undefined\"!=typeof window?window:\"undefined\"!=typeof global?global:\"undefined\"!=typeof self?self:{},l=\"object\"==t(f)&&f&&f.Object===Object&&f,p=\"object\"==(\"undefined\"==typeof self?\"undefined\":t(self))&&self&&self.Object===Object&&self,d=l||p||Function(\"return this\")(),h=function(){return d.Date.now()},y=d.Symbol,v=Object.prototype,g=v.hasOwnProperty,m=v.toString,b=y?y.toStringTag:void 0;var _=function(t){var e=g.call(t,b),n=t[b];try{t[b]=void 0;var r=!0}catch(t){}var i=m.call(t);return r&&(e?t[b]=n:delete t[b]),i},x=Object.prototype.toString;var S=function(t){return x.call(t)},w=y?y.toStringTag:void 0;var k=function(t){return null==t?void 0===t?\"[object Undefined]\":\"[object Null]\":w&&w in Object(t)?_(t):S(t)};var B=function(e){return null!=e&&\"object\"==t(e)};var E=function(e){return\"symbol\"==t(e)||B(e)&&\"[object Symbol]\"==k(e)},O=/^\\s+|\\s+$/g,C=/^[-+]0x[0-9a-f]+$/i,M=/^0b[01]+$/i,z=/^0o[0-7]+$/i,j=parseInt;var T=function(t){if(\"number\"==typeof t)return t;if(E(t))return NaN;if(u(t)){var e=\"function\"==typeof t.valueOf?t.valueOf():t;t=u(e)?e+\"\":e}if(\"string\"!=typeof t)return 0===t?t:+t;t=t.replace(O,\"\");var n=M.test(t);return n||z.test(t)?j(t.slice(2),n?2:8):C.test(t)?NaN:+t},D=Math.max,A=Math.min;var H,R,L=function(t,e,n){var r,i,o,c,a,s,f=0,l=!1,p=!1,d=!0;if(\"function\"!=typeof t)throw new TypeError(\"Expected a function\");function y(e){var n=r,o=i;return r=i=void 0,f=e,c=t.apply(o,n)}function v(t){return f=t,a=setTimeout(m,e),l?y(t):c}function g(t){var n=t-s;return void 0===s||n>=e||n<0||p&&t-f>=o}function m(){var t=h();if(g(t))return b(t);a=setTimeout(m,function(t){var n=e-(t-s);return p?A(n,o-(t-f)):n}(t))}function b(t){return a=void 0,d&&r?y(t):(r=i=void 0,c)}function _(){var t=h(),n=g(t);if(r=arguments,i=this,s=t,n){if(void 0===a)return v(s);if(p)return clearTimeout(a),a=setTimeout(m,e),y(s)}return void 0===a&&(a=setTimeout(m,e)),c}return e=T(e)||0,u(n)&&(l=!!n.leading,o=(p=\"maxWait\"in n)?D(T(n.maxWait)||0,e):o,d=\"trailing\"in n?!!n.trailing:d),_.cancel=function(){void 0!==a&&clearTimeout(a),f=0,r=s=i=a=void 0},_.flush=function(){return void 0===a?c:b(h())},_},F=F||function(t,e){var n={},r=n.lib={},i=function(){},o=r.Base={extend:function(t){i.prototype=this;var e=new i;return t&&e.mixIn(t),e.hasOwnProperty(\"init\")||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty(\"toString\")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},c=r.WordArray=o.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||s).stringify(this)},concat:function(t){var e=this.words,n=t.words,r=this.sigBytes;if(t=t.sigBytes,this.clamp(),r%4)for(var i=0;i<t;i++)e[r+i>>>2]|=(n[i>>>2]>>>24-i%4*8&255)<<24-(r+i)%4*8;else if(65535<n.length)for(i=0;i<t;i+=4)e[r+i>>>2]=n[i>>>2];else e.push.apply(e,n);return this.sigBytes+=t,this},clamp:function(){var e=this.words,n=this.sigBytes;e[n>>>2]&=4294967295<<32-n%4*8,e.length=t.ceil(n/4)},clone:function(){var t=o.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var n=[],r=0;r<e;r+=4)n.push(4294967296*t.random()|0);return new c.init(n,e)}}),a=n.enc={},s=a.Hex={stringify:function(t){var e=t.words;t=t.sigBytes;for(var n=[],r=0;r<t;r++){var i=e[r>>>2]>>>24-r%4*8&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join(\"\")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r+=2)n[r>>>3]|=parseInt(t.substr(r,2),16)<<24-r%8*4;return new c.init(n,e/2)}},u=a.Latin1={stringify:function(t){var e=t.words;t=t.sigBytes;for(var n=[],r=0;r<t;r++)n.push(String.fromCharCode(e[r>>>2]>>>24-r%4*8&255));return n.join(\"\")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r++)n[r>>>2]|=(255&t.charCodeAt(r))<<24-r%4*8;return new c.init(n,e)}},f=a.Utf8={stringify:function(t){try{return decodeURIComponent(escape(u.stringify(t)))}catch(t){throw Error(\"Malformed UTF-8 data\")}},parse:function(t){return u.parse(unescape(encodeURIComponent(t)))}},l=r.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new c.init,this._nDataBytes=0},_append:function(t){\"string\"==typeof t&&(t=f.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var n=this._data,r=n.words,i=n.sigBytes,o=this.blockSize,a=i/(4*o);if(e=(a=e?t.ceil(a):t.max((0|a)-this._minBufferSize,0))*o,i=t.min(4*e,i),e){for(var s=0;s<e;s+=o)this._doProcessBlock(r,s);s=r.splice(0,e),n.sigBytes-=i}return new c.init(s,i)},clone:function(){var t=o.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});r.Hasher=l.extend({cfg:o.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){l.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,n){return new t.init(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return new p.HMAC.init(t,n).finalize(e)}}});var p=n.algo={};return n}(Math);R=(H=F).lib.WordArray,H.enc.Base64={stringify:function(t){var e=t.words,n=t.sigBytes,r=this._map;t.clamp(),t=[];for(var i=0;i<n;i+=3)for(var o=(e[i>>>2]>>>24-i%4*8&255)<<16|(e[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|e[i+2>>>2]>>>24-(i+2)%4*8&255,c=0;4>c&&i+.75*c<n;c++)t.push(r.charAt(o>>>6*(3-c)&63));if(e=r.charAt(64))for(;t.length%4;)t.push(e);return t.join(\"\")},parse:function(t){var e=t.length,n=this._map;(r=n.charAt(64))&&-1!=(r=t.indexOf(r))&&(e=r);for(var r=[],i=0,o=0;o<e;o++)if(o%4){var c=n.indexOf(t.charAt(o-1))<<o%4*2,a=n.indexOf(t.charAt(o))>>>6-o%4*2;r[i>>>2]|=(c|a)<<24-i%4*8,i++}return R.create(r,i)},_map:\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\"},function(t){function e(t,e,n,r,i,o,c){return((t=t+(e&n|~e&r)+i+c)<<o|t>>>32-o)+e}function n(t,e,n,r,i,o,c){return((t=t+(e&r|n&~r)+i+c)<<o|t>>>32-o)+e}function r(t,e,n,r,i,o,c){return((t=t+(e^n^r)+i+c)<<o|t>>>32-o)+e}function i(t,e,n,r,i,o,c){return((t=t+(n^(e|~r))+i+c)<<o|t>>>32-o)+e}for(var o=F,c=(s=o.lib).WordArray,a=s.Hasher,s=o.algo,u=[],f=0;64>f;f++)u[f]=4294967296*t.abs(t.sin(f+1))|0;s=s.MD5=a.extend({_doReset:function(){this._hash=new c.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,o){for(var c=0;16>c;c++){var a=t[s=o+c];t[s]=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8)}c=this._hash.words;var s=t[o+0],f=(a=t[o+1],t[o+2]),l=t[o+3],p=t[o+4],d=t[o+5],h=t[o+6],y=t[o+7],v=t[o+8],g=t[o+9],m=t[o+10],b=t[o+11],_=t[o+12],x=t[o+13],S=t[o+14],w=t[o+15],k=e(k=c[0],O=c[1],E=c[2],B=c[3],s,7,u[0]),B=e(B,k,O,E,a,12,u[1]),E=e(E,B,k,O,f,17,u[2]),O=e(O,E,B,k,l,22,u[3]);k=e(k,O,E,B,p,7,u[4]),B=e(B,k,O,E,d,12,u[5]),E=e(E,B,k,O,h,17,u[6]),O=e(O,E,B,k,y,22,u[7]),k=e(k,O,E,B,v,7,u[8]),B=e(B,k,O,E,g,12,u[9]),E=e(E,B,k,O,m,17,u[10]),O=e(O,E,B,k,b,22,u[11]),k=e(k,O,E,B,_,7,u[12]),B=e(B,k,O,E,x,12,u[13]),E=e(E,B,k,O,S,17,u[14]),k=n(k,O=e(O,E,B,k,w,22,u[15]),E,B,a,5,u[16]),B=n(B,k,O,E,h,9,u[17]),E=n(E,B,k,O,b,14,u[18]),O=n(O,E,B,k,s,20,u[19]),k=n(k,O,E,B,d,5,u[20]),B=n(B,k,O,E,m,9,u[21]),E=n(E,B,k,O,w,14,u[22]),O=n(O,E,B,k,p,20,u[23]),k=n(k,O,E,B,g,5,u[24]),B=n(B,k,O,E,S,9,u[25]),E=n(E,B,k,O,l,14,u[26]),O=n(O,E,B,k,v,20,u[27]),k=n(k,O,E,B,x,5,u[28]),B=n(B,k,O,E,f,9,u[29]),E=n(E,B,k,O,y,14,u[30]),k=r(k,O=n(O,E,B,k,_,20,u[31]),E,B,d,4,u[32]),B=r(B,k,O,E,v,11,u[33]),E=r(E,B,k,O,b,16,u[34]),O=r(O,E,B,k,S,23,u[35]),k=r(k,O,E,B,a,4,u[36]),B=r(B,k,O,E,p,11,u[37]),E=r(E,B,k,O,y,16,u[38]),O=r(O,E,B,k,m,23,u[39]),k=r(k,O,E,B,x,4,u[40]),B=r(B,k,O,E,s,11,u[41]),E=r(E,B,k,O,l,16,u[42]),O=r(O,E,B,k,h,23,u[43]),k=r(k,O,E,B,g,4,u[44]),B=r(B,k,O,E,_,11,u[45]),E=r(E,B,k,O,w,16,u[46]),k=i(k,O=r(O,E,B,k,f,23,u[47]),E,B,s,6,u[48]),B=i(B,k,O,E,y,10,u[49]),E=i(E,B,k,O,S,15,u[50]),O=i(O,E,B,k,d,21,u[51]),k=i(k,O,E,B,_,6,u[52]),B=i(B,k,O,E,l,10,u[53]),E=i(E,B,k,O,m,15,u[54]),O=i(O,E,B,k,a,21,u[55]),k=i(k,O,E,B,v,6,u[56]),B=i(B,k,O,E,w,10,u[57]),E=i(E,B,k,O,h,15,u[58]),O=i(O,E,B,k,x,21,u[59]),k=i(k,O,E,B,p,6,u[60]),B=i(B,k,O,E,b,10,u[61]),E=i(E,B,k,O,f,15,u[62]),O=i(O,E,B,k,g,21,u[63]);c[0]=c[0]+k|0,c[1]=c[1]+O|0,c[2]=c[2]+E|0,c[3]=c[3]+B|0},_doFinalize:function(){var e=this._data,n=e.words,r=8*this._nDataBytes,i=8*e.sigBytes;n[i>>>5]|=128<<24-i%32;var o=t.floor(r/4294967296);for(n[15+(i+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),n[14+(i+64>>>9<<4)]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),e.sigBytes=4*(n.length+1),this._process(),n=(e=this._hash).words,r=0;4>r;r++)i=n[r],n[r]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8);return e},clone:function(){var t=a.clone.call(this);return t._hash=this._hash.clone(),t}}),o.MD5=a._createHelper(s),o.HmacMD5=a._createHmacHelper(s)}(Math),function(){var t,e=F,n=(t=e.lib).Base,r=t.WordArray,i=(t=e.algo).EvpKDF=n.extend({cfg:n.extend({keySize:4,hasher:t.MD5,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var n=(a=this.cfg).hasher.create(),i=r.create(),o=i.words,c=a.keySize,a=a.iterations;o.length<c;){s&&n.update(s);var s=n.update(t).finalize(e);n.reset();for(var u=1;u<a;u++)s=n.finalize(s),n.reset();i.concat(s)}return i.sigBytes=4*c,i}});e.EvpKDF=function(t,e,n){return i.create(n).compute(t,e)}}(),F.lib.Cipher||function(t){var e=(d=F).lib,n=e.Base,r=e.WordArray,i=e.BufferedBlockAlgorithm,o=d.enc.Base64,c=d.algo.EvpKDF,a=e.Cipher=i.extend({cfg:n.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,n){this.cfg=this.cfg.extend(n),this._xformMode=t,this._key=e,this.reset()},reset:function(){i.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(t){return{encrypt:function(e,n,r){return(\"string\"==typeof n?h:p).encrypt(t,e,n,r)},decrypt:function(e,n,r){return(\"string\"==typeof n?h:p).decrypt(t,e,n,r)}}}});e.StreamCipher=a.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var s=d.mode={},u=function(t,e,n){var r=this._iv;r?this._iv=void 0:r=this._prevBlock;for(var i=0;i<n;i++)t[e+i]^=r[i]},f=(e.BlockCipherMode=n.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}})).extend();f.Encryptor=f.extend({processBlock:function(t,e){var n=this._cipher,r=n.blockSize;u.call(this,t,e,r),n.encryptBlock(t,e),this._prevBlock=t.slice(e,e+r)}}),f.Decryptor=f.extend({processBlock:function(t,e){var n=this._cipher,r=n.blockSize,i=t.slice(e,e+r);n.decryptBlock(t,e),u.call(this,t,e,r),this._prevBlock=i}}),s=s.CBC=f,f=(d.pad={}).Pkcs7={pad:function(t,e){for(var n,i=(n=(n=4*e)-t.sigBytes%n)<<24|n<<16|n<<8|n,o=[],c=0;c<n;c+=4)o.push(i);n=r.create(o,n),t.concat(n)},unpad:function(t){t.sigBytes-=255&t.words[t.sigBytes-1>>>2]}},e.BlockCipher=a.extend({cfg:a.cfg.extend({mode:s,padding:f}),reset:function(){a.reset.call(this);var t=(e=this.cfg).iv,e=e.mode;if(this._xformMode==this._ENC_XFORM_MODE)var n=e.createEncryptor;else n=e.createDecryptor,this._minBufferSize=1;this._mode=n.call(e,this,t&&t.words)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){t.pad(this._data,this.blockSize);var e=this._process(!0)}else e=this._process(!0),t.unpad(e);return e},blockSize:4});var l=e.CipherParams=n.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}}),p=(s=(d.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext;return((t=t.salt)?r.create([1398893684,1701076831]).concat(t).concat(e):e).toString(o)},parse:function(t){var e=(t=o.parse(t)).words;if(1398893684==e[0]&&1701076831==e[1]){var n=r.create(e.slice(2,4));e.splice(0,4),t.sigBytes-=16}return l.create({ciphertext:t,salt:n})}},e.SerializableCipher=n.extend({cfg:n.extend({format:s}),encrypt:function(t,e,n,r){r=this.cfg.extend(r);var i=t.createEncryptor(n,r);return e=i.finalize(e),i=i.cfg,l.create({ciphertext:e,key:n,iv:i.iv,algorithm:t,mode:i.mode,padding:i.padding,blockSize:t.blockSize,formatter:r.format})},decrypt:function(t,e,n,r){return r=this.cfg.extend(r),e=this._parse(e,r.format),t.createDecryptor(n,r).finalize(e.ciphertext)},_parse:function(t,e){return\"string\"==typeof t?e.parse(t,this):t}})),d=(d.kdf={}).OpenSSL={execute:function(t,e,n,i){return i||(i=r.random(8)),t=c.create({keySize:e+n}).compute(t,i),n=r.create(t.words.slice(e),4*n),t.sigBytes=4*e,l.create({key:t,iv:n,salt:i})}},h=e.PasswordBasedCipher=p.extend({cfg:p.cfg.extend({kdf:d}),encrypt:function(t,e,n,r){return n=(r=this.cfg.extend(r)).kdf.execute(n,t.keySize,t.ivSize),r.iv=n.iv,(t=p.encrypt.call(this,t,e,n.key,r)).mixIn(n),t},decrypt:function(t,e,n,r){return r=this.cfg.extend(r),e=this._parse(e,r.format),n=r.kdf.execute(n,t.keySize,t.ivSize,e.salt),r.iv=n.iv,p.decrypt.call(this,t,e,n.key,r)}})}(),function(){for(var t=F,e=t.lib.BlockCipher,n=t.algo,r=[],i=[],o=[],c=[],a=[],s=[],u=[],f=[],l=[],p=[],d=[],h=0;256>h;h++)d[h]=128>h?h<<1:h<<1^283;var y=0,v=0;for(h=0;256>h;h++){var g=(g=v^v<<1^v<<2^v<<3^v<<4)>>>8^255&g^99;r[y]=g,i[g]=y;var m=d[y],b=d[m],_=d[b],x=257*d[g]^16843008*g;o[y]=x<<24|x>>>8,c[y]=x<<16|x>>>16,a[y]=x<<8|x>>>24,s[y]=x,x=16843009*_^65537*b^257*m^16843008*y,u[g]=x<<24|x>>>8,f[g]=x<<16|x>>>16,l[g]=x<<8|x>>>24,p[g]=x,y?(y=m^d[d[d[_^m]]],v^=d[d[v]]):y=v=1}var S=[0,1,2,4,8,16,32,64,128,27,54];n=n.AES=e.extend({_doReset:function(){for(var t=(n=this._key).words,e=n.sigBytes/4,n=4*((this._nRounds=e+6)+1),i=this._keySchedule=[],o=0;o<n;o++)if(o<e)i[o]=t[o];else{var c=i[o-1];o%e?6<e&&4==o%e&&(c=r[c>>>24]<<24|r[c>>>16&255]<<16|r[c>>>8&255]<<8|r[255&c]):(c=r[(c=c<<8|c>>>24)>>>24]<<24|r[c>>>16&255]<<16|r[c>>>8&255]<<8|r[255&c],c^=S[o/e|0]<<24),i[o]=i[o-e]^c}for(t=this._invKeySchedule=[],e=0;e<n;e++)o=n-e,c=e%4?i[o]:i[o-4],t[e]=4>e||4>=o?c:u[r[c>>>24]]^f[r[c>>>16&255]]^l[r[c>>>8&255]]^p[r[255&c]]},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,o,c,a,s,r)},decryptBlock:function(t,e){var n=t[e+1];t[e+1]=t[e+3],t[e+3]=n,this._doCryptBlock(t,e,this._invKeySchedule,u,f,l,p,i),n=t[e+1],t[e+1]=t[e+3],t[e+3]=n},_doCryptBlock:function(t,e,n,r,i,o,c,a){for(var s=this._nRounds,u=t[e]^n[0],f=t[e+1]^n[1],l=t[e+2]^n[2],p=t[e+3]^n[3],d=4,h=1;h<s;h++){var y=r[u>>>24]^i[f>>>16&255]^o[l>>>8&255]^c[255&p]^n[d++],v=r[f>>>24]^i[l>>>16&255]^o[p>>>8&255]^c[255&u]^n[d++],g=r[l>>>24]^i[p>>>16&255]^o[u>>>8&255]^c[255&f]^n[d++];p=r[p>>>24]^i[u>>>16&255]^o[f>>>8&255]^c[255&l]^n[d++],u=y,f=v,l=g}y=(a[u>>>24]<<24|a[f>>>16&255]<<16|a[l>>>8&255]<<8|a[255&p])^n[d++],v=(a[f>>>24]<<24|a[l>>>16&255]<<16|a[p>>>8&255]<<8|a[255&u])^n[d++],g=(a[l>>>24]<<24|a[p>>>16&255]<<16|a[u>>>8&255]<<8|a[255&f])^n[d++],p=(a[p>>>24]<<24|a[u>>>16&255]<<16|a[f>>>8&255]<<8|a[255&l])^n[d++],t[e]=y,t[e+1]=v,t[e+2]=g,t[e+3]=p},keySize:8});t.AES=e._createHelper(n)}();var P=/^https?\\:\\/\\/gist.github.com/;function N(t,e){var n,r=document.createElement(\"div\");r.innerHTML=t,n=r,setTimeout((function(){var t=n.getElementsByTagName(\"script\");t&&t.length&&Array.from(t).forEach((function(t){var e=document.createElement(\"div\");t.parentElement.insertBefore(e,t);var n=t.innerHTML,r=t.src;if(n||r){if(r&&r.match(P)){var i=document.createElement(\"iframe\");return i.style.display=\"none\",i.onload=function(){var t=i.contentDocument;if(t){var n=document.createElement(\"div\"),r=t.querySelector('link[rel=\"stylesheet\"]'),o=t.querySelector(\".gist\");if(r&&o){var c=o.cloneNode();c.innerHTML=o.innerHTML,n.appendChild(r.cloneNode()),n.appendChild(c)}e.removeChild(i),e.appendChild(n),i=t=null}},i.srcdoc='<script src=\"'.concat(r,'\"><\\/script>'),void e.appendChild(i)}var o=document.createElement(\"script\");r?o.src=r:o.innerHTML=n,e.appendChild(o),e.parentElement.removeChild(e)}}))}),16.667),e.insertAdjacentElement(\"beforebegin\",r),e.parentNode.removeChild(e)}function I(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,r=document.createElement(t);return e.class&&r.classList.add(e.class),e.props&&Object.keys(e.props).forEach((function(t){return r[t]=e.props[t]})),e.innerHTML&&(r.innerHTML=e.innerHTML),n&&n.forEach((function(t){r.appendChild(t)})),r}var U,W,X,$,K,q=JSON.parse('[\":host{position:relative;display:block;min-height:3em;word-break:break-all;font-size:small;filter:blur(4px)}.a,.d input{position:absolute;left:0}.a{top:0;right:0;z-index:1;display:flex;align-items:center;justify-content:center;max-height:40em;height:100%;text-align:center}.b{filter:blur(4px);user-select:none}.c,.d{display:inline-block}.c{white-space:nowrap}.d{position:relative;padding:0 1em;min-width:14rem;background:0 0;color:inherit;font-size:inherit;line-height:2rem;transform:translateY(-6px)}.d span{visibility:hidden}.d input{padding:0;width:100%;border:0;box-shadow:0 2px 0 0 rgba(255,255,255,.5),0 2px 0 0 currentColor;text-align:inherit;font-family:inherit;transition:box-shadow .1s ease-in-out}.d input::placeholder{color:inherit;transition:color .1s ease-in-out}.d input:focus{outline:0;box-shadow:0 2px 0 0 currentColor;color:inherit}.d input:focus::placeholder{color:transparent}\",{\"cipher\":\"a\",\"mask\":\"b\",\"ghost\":\"c\",\"field\":\"d\"}]'),J=(W=2,function(t){if(Array.isArray(t))return t}(U=q)||function(t,e){if(\"undefined\"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,i=!1,o=void 0;try{for(var c,a=t[Symbol.iterator]();!(r=(c=a.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(t){i=!0,o=t}finally{try{r||null==a.return||a.return()}finally{if(i)throw o}}return n}}(U,W)||function(t,e){if(t){if(\"string\"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return\"Object\"===n&&t.constructor&&(n=t.constructor.name),\"Map\"===n||\"Set\"===n?Array.from(t):\"Arguments\"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}(U,W)||function(){throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\")}()),Y=J[0],G=J[1],Q=F.AES,V=F.enc.Utf8;X=\"cipher\",$={style:Y,connected:function(t){var e=t.root,n=e.host,r=n.getAttribute(\"placeholder\")||\"Passcode is required\",i=I(\"input\",{class:G.field,props:{placeholder:r}}),o=I(\"div\",{class:G.field},[i,I(\"span\",{innerHTML:r})]),c=I(\"div\",{class:G.cipher},[o]),a=I(\"div\",{class:G.mask});i.addEventListener(\"input\",L((function(t){var e=function(t,e){try{return Q.decrypt(t,e).toString(V)}catch(t){}}(a.innerHTML,i.value);e&&N(e,n)}),100)),e.appendChild(c),e.appendChild(a),setTimeout((function(){a.innerHTML=n.innerHTML,n.innerHTML=\"\",n.style.filter=\"none\"}))}},K={root:null},customElements.define(\"is-\".concat(X),function(t){!function(t,e){if(\"function\"!=typeof e&&null!==e)throw new TypeError(\"Super expression must either be null or a function\");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}(p,t);var o,c,s,u,f,l=(o=p,c=i(),function(){var t,e=n(o);if(c){var r=n(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return a(this,t)});function p(){var t;!function(t,e){if(!(t instanceof e))throw new TypeError(\"Cannot call a class as a function\")}(this,p);var e=(t=l.call(this)).attachShadow({mode:\"open\"}),n=document.createElement(\"style\");return n.textContent=$.style,$.created&&Object.assign(K,$.created(e)),K.root=e,e.appendChild(n),t}return s=p,f=[{key:\"observedAttributes\",get:function(){return $.attrs}}],(u=[{key:\"connectedCallback\",value:function(){$.connected&&$.connected(K)}},{key:\"attributeChangedCallback\",value:function(t,e,n){$.changed&&$.changed(K,[t,e,n])}}])&&e(s.prototype,u),f&&e(s,f),p}(c(HTMLElement)))}();\n"})),e.extend.injector.register("head_end",r.js("cipher.d210d59f.js"))},exports.filename="cipher.d210d59f.js",exports.schema={properties:{placeholder:{type:"string",default:"Passcode is required"},excerpt:{type:"string",default:"Content encrypted"}},required:["placeholder","excerpt"],additionalProperties:!1};
