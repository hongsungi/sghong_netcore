using System.Security.Cryptography;
using System.Text;
using System.Xml;

namespace Manager.Common
{
    public class AES
    {
        private byte[] byteIV = new byte[16];
        private byte[] byteKey = new byte[16];

        public AES()
        {
            byteKey = hex2binl("C4DBDD53DC4515B1750E868D4653ED3B");
            byteIV = hex2binl("A2C11FCA07FAEB4E3C1673E0EC252B5F");
        }

        public AES(string key, string iv)
        {
            byteKey = hex2binl(key);
            byteIV = hex2binl(iv);

        }

        public AES(string SystemConfigPath)
        {
            XmlDocument xmlDoc;
            XmlNode xmlRoot;

            xmlDoc = new XmlDocument();
            xmlDoc.Load(SystemConfigPath);
            xmlRoot = xmlDoc.DocumentElement;

            byteKey = hex2binl(xmlRoot.SelectNodes("/Configuration/AES")[0]["Key"].InnerText);
            byteIV = hex2binl(xmlRoot.SelectNodes("/Configuration/AES")[0]["IV"].InnerText);
        }

        private static string binl2hex(byte[] arrByte)
        {
            string hex_tab = "0123456789abcdef";
            string strReturn = null;
            for (int i = 0; i < arrByte.Length; i++)
            {
                strReturn += hex_tab[(arrByte[i] >> 4)];
                strReturn += hex_tab[(arrByte[i] & 0x0f)];
            }
            return strReturn;
        }

        private static byte[] hex2binl(string arrHex)
        {
            byte[] binl = new byte[(int)(arrHex.Length >> 1)];
            int temp, temp1;
            for (int i = 0; i < arrHex.Length; i += 2)
            {
                if ((int)arrHex[i] < 58)
                    temp = (int)arrHex[i] - 48;
                else
                    temp = (int)arrHex[i] - 87;

                if ((int)arrHex[i + 1] < 58)
                    temp1 = (int)arrHex[i + 1] - 48;
                else
                    temp1 = (int)arrHex[i + 1] - 87;

                binl[i >> 1] = (byte)((temp << 4) + temp1);
            }
            return binl;
        }

        public string Encrypt(string strText)
        {
            Rijndael Rd = new RijndaelManaged();
            Rd.Mode = CipherMode.CBC;
            Rd.IV = byteIV;
            Rd.KeySize = 128;

            byte[] data = Encoding.Default.GetBytes(strText);

            MemoryStream mIn = new MemoryStream(data);
            MemoryStream mOut = new MemoryStream();
            CryptoStream encStream = new CryptoStream(mIn, Rd.CreateEncryptor(byteKey, byteIV), CryptoStreamMode.Read);
            int bytesRead;

            byte[] output = new byte[2048];
            do
            {
                bytesRead = encStream.Read(output, 0, 2048);
                if (bytesRead != 0)
                    mOut.Write(output, 0, bytesRead);
            } while (bytesRead > 0);

            byte[] encrypted = mOut.ToArray();
            string Estring = Convert.ToBase64String(encrypted);
            return Estring;
        }

        public string Decrypt(string strText)
        {
            Rijndael Rd = new RijndaelManaged();
            Rd.Mode = CipherMode.CBC;
            Rd.IV = byteIV;
            Rd.KeySize = 128;

            string originalString;
            MemoryStream mInDec = new MemoryStream(Convert.FromBase64String(strText));
            CryptoStream decStream = new CryptoStream(mInDec, Rd.CreateDecryptor(byteKey, byteIV), CryptoStreamMode.Read);
            StreamReader SReader = new StreamReader(decStream, Encoding.Default);
            originalString = SReader.ReadToEnd();
            return originalString;
        }
    }
}
