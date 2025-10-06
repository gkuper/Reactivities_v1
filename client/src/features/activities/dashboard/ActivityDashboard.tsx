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
    submitForm: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}       

export default function ActivityDashboard({activities, selectActivity, 
    selectedActivity, 
    cancelSelectActivity,
    openForm,
    closeForm,
    editMode,
    submitForm,
    deleteActivity
}: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList activities={activities} 
                                selectActivity={selectActivity}
                                deleteActivity={deleteActivity}
                />
            </Grid2>
            <Grid2 size={5}>
                {selectedActivity && !editMode && 
                    <ActivitiesDetail activity={selectedActivity}
                                cancelSelectActivity= {cancelSelectActivity} 
                                openForm = {openForm}/>
                }
                {editMode && <ActivityForm closeForm = {closeForm}
                 submitForm={submitForm}
                 activity = {selectedActivity} /> }                             
            </Grid2>
        </Grid2>
    )
}
