import HeroSlider from '../components/Home/HeroSlider';
import Blessing from '../components/Home/Blessing';
import AboutSection from '../components/Home/AboutSection';
import ServicesGrid from '../components/Home/ServicesGrid';
import CosmicWonders from '../components/Home/CosmicWonders';
import TrustMembers from '../components/Home/TrustMembers';
import Gallery from '../components/Home/Gallery';
import NewsBlogs from '../components/Home/NewsBlogs';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Blessing />
      <AboutSection />
      <ServicesGrid />
      <CosmicWonders />
      <TrustMembers />
      <Gallery />
      <NewsBlogs />
    </>
  );
}
