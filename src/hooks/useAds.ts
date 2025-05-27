import { adsAPI } from "@/services/ads"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAds = ()=>{
    return useQuery({
        queryKey:["ads"],
        queryFn: async ()=>adsAPI.getAds(),
        staleTime:1000*60*5,
    });
}
export const useAdsDelete = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id:string)=>{
            return await adsAPI.deleteAds(id);
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["ads"]});
        },
    }); 
}