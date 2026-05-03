import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import InstagramPreview from '../components/InstagramPreview';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function HomePage({ user }) {
    return (
        <>
            <Hero />
            <About />
            <Services />
            <InstagramPreview />
            <Testimonials user={user} />
            <Contact />
        </>
    );
}
