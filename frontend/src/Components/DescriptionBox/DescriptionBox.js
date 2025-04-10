import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>An e-commere website is an platform that facilitates the buying and selling of products or services over internet.
                    It serves as the virtual marketplace where businesses and individual can showcase  their product, interacgt with
                    customers, and conduct transactions without the need for a physical presence. E-commerce website have gained immense
                    pupularity due to their convenience, accessibility, and the global reach they order.</p>
                <p>E-commerce website typically display products or services along with detailed descriptions, images, peices,
                    and any available variations (eg.,sizes, colors). Each products usually has its own dedicated page with relevant infomartion.</p>
            </div>
        </div>
    )
}

export default DescriptionBox