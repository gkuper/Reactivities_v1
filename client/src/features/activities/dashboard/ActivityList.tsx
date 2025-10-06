import { Box } from "@mui/material";
import ActivityCards from "./ActivityCard";

type Props = {
    activities: Activity[];
    selectActivity?: (id: string) => void;
    deleteActivity?: (id: string) => void;
}

export default function ActivityList({activities, selectActivity, deleteActivity}: Props) {
  return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            {activities.map(activity => (
                <ActivityCards key={activity.id} 
                deleteActivity={deleteActivity}
                activity={activity} selectActivity={selectActivity} />
            ))}
        </Box>
  )
}
