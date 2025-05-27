import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TypeAnimation } from 'react-type-animation'

gsap.registerPlugin(ScrollTrigger)

function RightPanel() {
    const data = [
        'Smoking (active or passive)',
        'Air pollution exposure',
        'Low oxygen saturation',
        'Chronic illnesses (e.g., diabetes, hypertension)',
        'High stress or low immunity',
        'Family history of respiratory conditions'
    ]

    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.fade-section', {
                opacity: 0,
                y: 40,
                duration: 1,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            })

            gsap.from('.list-item', {
                opacity: 0,
                x: -30,
                duration: 0.6,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={containerRef}
            className='md:w-1/2 w-full h-screen text-white  p-6 overflow-y-auto'
        >
            <div className='w-full h-20 flex items-center justify-center fade-section'>
                <TypeAnimation
                    sequence={[
                        'Catch it Early. Breathe Easy.',
                        2000, 
                    ]}
                    wrapper="h1"
                    cursor={true}
                    repeat={Infinity}
                    className='text-center text-xl md:text-3xl text-orange-400 font-bold'
                />
            </div>

            <div className='fade-section mt-6'>
                <h2 className='text-xl md:text-2xl font-semibold'>🫁 What is Pulmonary Disease?</h2>
                <p className='text-sm md:text-md mt-2'>
                    Pulmonary disease is a broad term for any condition that impacts lung function. It can be obstructive (e.g., COPD), restrictive
                    (e.g., pulmonary fibrosis), or infectious (e.g., pneumonia, tuberculosis). Early diagnosis is key to effective management and better quality of life.
                </p>
            </div>

            <div className='fade-section mt-6'>
                <h2 className='text-xl md:text-2xl font-semibold'>🌬️ How This System Helps</h2>
                <p className='text-sm md:text-md mt-2'>
                    By analyzing your lifestyle, health metrics, and family history, our AI-powered system predicts your risk level and guides you with insights for proactive lung health.
                </p>
            </div>

            <div className='fade-section mt-6'>
                <h2 className='text-xl md:text-2xl font-semibold'>⚠️ Common Risk Factors</h2>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-md">
                    {data.map((item, index) => (
                        <li key={index} className="list-item">{item}</li>
                    ))}
                </ul>
            </div>


        </div>
    )
}

export default RightPanel
