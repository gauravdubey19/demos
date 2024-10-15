import EditOutfit from '@/components/Admin/Products/Outfit/OutfitCollection/OutfitEdit';
import React from 'react';

interface PageProps {
    params:any
}

export default function EditOutfitPage({ 
    params 
}: PageProps){
    return (
        <div className="w-full md:w-[68%] lg:w-[75%] xl:w-[82%] h-full overflow-hidden">
            <EditOutfit id= { params.id } />
        </div>
    );
};
