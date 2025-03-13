import React from 'react';
import Hero from '../components/home/Hero';
import SearchBlood from '../components/home/SearchBlood';
import ImpactStats from '../components/home/ImpactStats';
import HowItWorks from '../components/home/HowItWorks';

const HomePage = () => {
    return (
        <>
            <section>
                <Hero />
            </section>

            <section>
                <ImpactStats />
            </section>

            <section>
                <HowItWorks />
            </section>
        </>
    );
};

export default HomePage;
