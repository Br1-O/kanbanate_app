"use client";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { defaultImages } from "@/public/resources/images";
import { CheckIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({
    id,
    errors
}: FormPickerProps) => {

    const { pending } = useFormStatus();

    const [images, setImages] = useState<Array<Record<string,any>>>(defaultImages);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {

        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    //picks from the collection that trello uses, up to 9 images
                    collectionIds: ["317099"],
                    count: 9
                });

                if (result && result.response) {
                    const unsplashImages = (result.response as Array<Record<string, any>>);
                    setImages(unsplashImages);
                } else {
                    console.log("Failed to fetch images from Unsplash.");
                }

            } catch (error) {
                console.log(error);
                //in case API doesn't response, it fall backs to the default images response
                setImages(defaultImages);

            }finally{
                setIsLoading(false);

            }
        }
    
        fetchImages();
    }, [])
    
    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
                <Loader2Icon className="h-6 w-6 text-sky-700 animate-spin" />
            </div>
          );
    }


    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((image) => (
                    <div 
                        key={image.id}
                        className={cn(
                        "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                        pending && "opacity-50 hover:opacity-50 cursor-auto"
                        )}
                        onClick={() => {
                            if (pending) return;
                            setSelectedImageId(image.id);
                        }}
                    >

                        <input 
                            type="radio" 
                            id={id}
                            name={id}
                            className="hidden"
                            checked={selectedImageId === image.id}
                            disabled={pending}
                            onChange={()=>{}}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />

                        <Image 
                            src={image.urls.thumb}
                            alt={image.alt_description}
                            className="object-cover rounded-sm"
                            fill
                        />

                        {selectedImageId === image.id && (
                            <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                                <CheckIcon className="h-4 w-4 text-white" />
                            </div>
                        )}

                        <Link href={image.links.html}
                            target="_blank"
                            className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full
                            text-[10px] truncate text-white hover:underline p-1 bg-black/50"    
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors 
                id="image"
                errors={errors}
            />
        </div>
    )

}
