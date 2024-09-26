import React from 'react';
import Masonry from 'react-masonry-css';
import './Memories.css'; 
import mem1 from '../../assets/mem1.jpeg';
import mem2 from '../../assets/mem2.jpg';
import mem3 from '../../assets/mem3.jpg';
import mem4 from '../../assets/mem4.jpg';
import mem5 from '../../assets/mem5.jpg';
import mem6 from '../../assets/mem6.jpg';
import mem7 from '../../assets/mem7.jpeg';
import mem8 from '../../assets/mem8.jpg';
import mem9 from '../../assets/mem9.jpg';
import mem10 from '../../assets/mem10.jpg';
import mem11 from '../../assets/mem11.jpg';
import mem12 from '../../assets/mem12.jpg';


const memoriesData = [
    { id: 1, src: mem1, alt: 'Wedding in India 1' },
    { id: 2, src: mem2, alt: 'Wedding in India 2' },
    { id: 3, src: mem3, alt: 'Wedding in India 3' },
    { id: 4, src: mem4, alt: 'Wedding in India 4' },
    { id: 5, src: mem5, alt: 'Wedding in India 5' },
    { id: 6, src: mem6, alt: 'Wedding in India 6' },
    { id: 7, src: mem7, alt: 'Wedding in India 7' },
    { id: 8, src: mem8, alt: 'Wedding in India 8' },
    { id: 9, src: mem9, alt: 'Wedding in India 9' },
    { id: 10, src: mem10, alt: 'Wedding in India 10' },
    { id: 11, src: mem11, alt: 'Wedding in India 11' },
    { id: 12, src: mem12, alt: 'Wedding in India 12' },
];

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

const Memories = () => {
    return (
        <div className="memories-container">
            <h1>Wedding Memories</h1>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {memoriesData.map((memory) => (
                    <div key={memory.id} className="memory-item">
                        <img src={memory.src} alt={memory.alt} />
                    </div>
                ))}
            </Masonry>
        </div>
    );
};

export default Memories;
