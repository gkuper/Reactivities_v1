import { Box } from "@mui/material";
import ActivityCards from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";


export default function ActivityList() {

      const { activities, isPending } = useActivities();
     
     if(!activities || isPending) return <h2>Loading activities...</h2>
     
  return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            {activities.map(activity => (
                <ActivityCards key={activity.id} 
                activity={activity}  />
            ))}
        </Box>
  )
}
