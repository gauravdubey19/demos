import React from 'react';
import CollectionGrid from './CollectionGrid';
import EditModal from './EditCollectionModal';

const CollectionCard = () => {
    return (
        <div className='h-max border scale-75 rounded-lg border-gray-300 flex flex-col justify-between items-center p-4'>
            <CollectionGrid />
            <EditModal/>
        </div>
    );
};

export default CollectionCard;
