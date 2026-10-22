import 'katex/dist/katex.min.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import BackgroundEffects from "../components/BackgroundEffects";
import { MusicProvider } from "../components/MusicProvider";
import FloatingPlayer from "../components/FloatingPlayer";
import { siteConfig } from "../siteConfig";
import ClickEffect from "../components/ClickEffect";
import BackgroundSlider from "../components/BackgroundSlider";
import GlobalToolbox from "../components/GlobalToolbox";
import SplashScreen from "../components/SplashScreen";
import CyberCat from '../components/CyberCat';
import DanmakuBackground from '../components/DanmakuBackground';

import MobileBackButton from '../components/MobileBackButton';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-serif",
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.bio,
  icons: {
    icon: siteConfig.faviconUrl,
    apple: siteConfig.faviconUrl,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <style
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              #app-mount-root { opacity: 0; visibility: hidden; pointer-events: none; }
              html.splash-seen #app-mount-root { opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }
            `
          }}
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('hasSeenSplash') === 'true') {
                  document.documentElement.classList.add('splash-seen');
                }
              } catch (e) {}
            `
          }}
        />
      </head>

      <body className="w-screen overflow-x-hidden min-h-full flex flex-col relative transition-colors duration-1000 bg-slate-50 dark:bg-slate-950 font-serif">
        <ThemeProvider>

          <SplashScreen />

          <MusicProvider>
            <div id="app-mount-root" className="flex-1 flex flex-col transition-opacity duration-1000">
              <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
                {!siteConfig.useGradient && (siteConfig.bgVideo ? (
                  <video
                    key={siteConfig.bgVideo}
                    className="absolute inset-0 z-[-10] w-full h-full object-cover"
                    autoPlay muted loop playsInline preload="metadata"
                    poster={siteConfig.bgImages[0] || undefined}
                  >
                    <source src={siteConfig.bgVideo} type={/\.webm$/i.test(siteConfig.bgVideo) ? 'video/webm' : 'video/mp4'} />
                  </video>
                ) : (
                  <BackgroundSlider />
                ))}
                {/* 背景清晰度：雾层轻描淡染（原 backdrop-blur-md + 高不透明度会让背景发糊） */}
                <div className="absolute inset-0 z-[-9] bg-white/10 dark:bg-slate-900/20 transition-colors duration-1000"></div>

                {/* 色彩 wash 层：静态（去掉全屏渐变流动动画，视频壁纸下避免整屏每帧重复合成） */}
                <div
                  className="absolute inset-0 z-[-8] opacity-25 dark:opacity-10 mix-blend-color transition-opacity duration-1000"
                  style={{
                    background: `linear-gradient(-45deg, ${siteConfig.themeColors.join(', ')})`,
                  }}
                ></div>

                {/* 装饰光晕：减小模糊半径、去掉 blend 叠加（壁纸模式下省合成开销） */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/25 dark:bg-slate-900/10 blur-[60px] rounded-full z-[-7]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/20 dark:bg-slate-700/15 blur-[60px] rounded-full z-[-7]"></div>

                {/* 隐藏手机端高负载粒子特效 */}
                <div className="hidden md:block absolute inset-0 w-full h-full">
                  <BackgroundEffects />
                </div>
              </div>

              {/* 隐藏手机端弹幕 */}
              <div className="hidden md:block">
                <DanmakuBackground />
              </div>

              <div className="relative z-10 flex-1 flex flex-col">
                {children}
              </div>

              <div className="hidden md:block">
                <FloatingPlayer />
              </div>

              <div className="hidden md:block">
                <GlobalToolbox />
              </div>

              <div className="md:hidden block">
                <MobileBackButton />
              </div>

              {/* 隐藏手机端点击粒子 */}
              <div className="hidden md:block">
                <ClickEffect />
              </div>
            </div>

            {/* gradientMove 动画已移除（性能优化：避免全屏背景层每帧合成） */}
          </MusicProvider>

          <div className="hidden md:block">
            <CyberCat />
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}