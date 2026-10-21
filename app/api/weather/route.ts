// app/api/weather/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.QWEATHER_KEY;
  const locationId = "101230101"; // 福建福州

  if (!token) {
    console.error("❌ 环境变量 QWEATHER_KEY (Token) 未找到");
    return NextResponse.json({ code: "500", message: "Token missing" }, { status: 500 });
  }

  // 新版和风控制台的 Key 绑定专属 API Host，必须走该 Host + X-QW-Api-Key 头
  const apiHosts = [
    'https://nq5pwfmr3h.re.qweatherapi.com/v7/weather/now',
  ];

  for (const host of apiHosts) {
    try {
      const url = `${host}?location=${locationId}`;
      console.log(`📡 正在请求天气: ${host}`);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'X-QW-Api-Key': token,
          'Accept-Encoding': 'gzip',
          'User-Agent': 'ForNothing-Blog/1.0',
        },
        cache: 'no-store',
      });

      const data = await res.json();

      // 200 说明认证与 Host 都对了
      if (data.code === "200" || res.status === 200) {
        console.log(`✅ 天气请求成功: ${host}`);
        return NextResponse.json(data);
      }

      console.warn(`⚠️ ${host} 请求未通过:`, data);

    } catch (err: any) {
      console.error(`🔥 请求 ${host} 出错:`, err.message);
      continue;
    }
  }

  return NextResponse.json({
    code: "500",
    message: "天气接口请求失败，请检查 QWEATHER_KEY 与专属 API Host",
  }, { status: 500 });
}