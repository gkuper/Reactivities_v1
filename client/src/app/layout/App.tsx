
import { useState } from 'react'
import {CssBaseline, Container, Box, Typography } from '@mui/material'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { useActivities } from '../../lib/hooks/useActivities'

function App() {
  
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const { activities, isPending } = useActivities();


  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(a => a.id === id))
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleFormOpen = (id?: string) => {
    if(id) handleSelectActivity(id)
    else handleCancelSelectActivity()
    setEditMode(true)
  }

  const handleFormClose = () => {
    setEditMode(false)
  }

  
  return (
    <Box sx={{bgcolor: 'eeeeee' , minHeight: '100vh'}}>
    <CssBaseline />
      <NavBar openForm={handleFormOpen} />
      <Container maxWidth='xl' sx={{mt: 4}} >
        {!activities || isPending ? <Typography>Loading activities...</Typography> 
        : (
       <ActivityDashboard 
       selectActivity={handleSelectActivity}
       cancelSelectActivity={handleCancelSelectActivity}
       selectedActivity={selectedActivity}
       activities ={activities}
       editMode={editMode}
       openForm={handleFormOpen}
       closeForm={handleFormClose}
       />   
        )}
       
      </Container>
     
   </Box>
  )
}

export default App
