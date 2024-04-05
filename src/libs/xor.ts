function keyCharAt(key: string, i: any) {
  return key.charCodeAt(Math.floor(i % key.length) );
}

export class XORCipher {
    static readonly b64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    static encode(key: string, data: any) {
      data = XORCipher.xor_encrypt(key, data);
      return XORCipher.b64_encode(data);
    }
    
    static decode(key: string, data: any) {
      data = XORCipher.b64_decode(data);
      return XORCipher.xor_decrypt(key, data);
    }

    private static b64_encode(data: any) {
      var o1, o2, o3, h1, h2, h3, h4, bits, r, i = 0, enc = "";
      if (!data) { return data; }
      do {
          o1 = data[i++];
          o2 = data[i++];
          o3 = data[i++];
          bits = o1 << 16 | o2 << 8 | o3;
          h1 = bits >> 18 & 0x3f;
          h2 = bits >> 12 & 0x3f;
          h3 = bits >> 6 & 0x3f;
          h4 = bits & 0x3f;
          enc += XORCipher.b64_table.charAt(h1) + XORCipher.b64_table.charAt(h2) + XORCipher.b64_table.charAt(h3) + XORCipher.b64_table.charAt(h4);
      } while (i < data.length);
      r = data.length % 3;
      return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
    }

    static b64_decode(data: any) {
      var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, result = [];
      if (!data) { return data; }
      data += "";
      do {
        h1 = XORCipher.b64_table.indexOf(data.charAt(i++));
        h2 = XORCipher.b64_table.indexOf(data.charAt(i++));
        h3 = XORCipher.b64_table.indexOf(data.charAt(i++));
        h4 = XORCipher.b64_table.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        result.push(o1);
        if (h3 !== 64) {
          result.push(o2);
          if (h4 !== 64) {
            result.push(o3);
          }
        }
      } while (i < data.length);
      return result;
    }
    
    private static xor_encrypt(key: string, data: any) {
      return data.map(function(c: any, i: number) {
        return c.charCodeAt(0) ^ keyCharAt(key, i);
      });
    }
    
    private static xor_decrypt(key: string, data: any) {
      return data.map(function(c: any, i: number) {
        return String.fromCharCode( c ^ keyCharAt(key, i) );
      }).join("");
    }
}
