import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRightCircle, Loader2 } from "lucide-react";
import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const SearchBar = () => {

    const inputRef = useRef<HTMLInputElement>(null)

    const [isSearching, startTransition] = useTransition()

    const router = useRouter()

    const [threat, setQuery] = useState<string>('')
    const searchThreat = () => {
        startTransition(() => {
            router.push(`/search?threat=${threat}`)
        })

    }

    return (
    <div>
        <div className="relative flex items-center gap-2 rounded-full border border-gray-800 bg-[#0c0c0c] focus:outline-none px-2 py-1">
        <Input
            type="text"
            disabled={isSearching}
            ref = {inputRef}
            value={threat}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    searchThreat()
                }
                if(e.key === "Escape") {
                    inputRef?.current?.blur()
                }
            }}
            placeholder="Search"
            className="flex-1 border-0 bg-transparent p-2 text-sm text-gray-100 focus-visible:ring-0 rounded-full font-geist-sans"
            aria-label="Search APT"
        />
        <div className="flex items-center gap-2">
            <Button disabled={ isSearching } onClick={ searchThreat } variant="default" size="icon" className="rounded-full">
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin"/> : <ArrowRightCircle className="h-4 w-4" />}
            </Button>
        </div>
        </div>
    </div>
    );
}

export default SearchBar;
