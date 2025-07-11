import LandingFeature from '@/components/home/LandingFeature';
import LandingFooter from '@/components/home/LandingFooter';
import LandingIntro from '@/components/home/LandingIntro';
import LandingMockup from '@/components/home/LandingMockup';

export default async function Main() {
  return (
    <>
      <div className="ml-24 h-[1000px] bg-amber-900">
        <LandingIntro />
        <LandingFeature />
        <LandingMockup />
        <LandingFooter />
      </div>
    </>
  );
}
