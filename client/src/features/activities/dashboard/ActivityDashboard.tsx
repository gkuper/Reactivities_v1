import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivitiesDetail from "../details/ActivitiesDetail";
import ActivityForm from "../forms/ActivityForm";
type Props = {
    activities: Activity[];
    selectActivity?: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity?: Activity;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;

}       

export default function ActivityDashboard({activities, selectActivity, 
    selectedActivity, 
    cancelSelectActivity,
    openForm,
    closeForm,
    editMode
}: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList activities={activities} 
                                selectActivity={selectActivity}
                              
                />
            </Grid2>
            <Grid2 size={5}>
                {selectedActivity && !editMode && 
                    <ActivitiesDetail selectedActivity={selectedActivity}
                                cancelSelectActivity= {cancelSelectActivity} 
                                openForm = {openForm}/>
                }
                {editMode && <ActivityForm closeForm = {closeForm}
                 activity = {selectedActivity} /> }                             
            </Grid2>
        </Grid2>
    )
}
