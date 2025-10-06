
import { useEffect, useState } from 'react'
import {CssBaseline, Container, Box } from '@mui/material'
import axios from 'axios'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'

function App() {
  const  [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)


  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
    .then(response => setActivities(response.data))
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id))
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

  const handleSubmitForm = (activity: Activity) => {
    if(activity.id) {
      setActivities(activities.map(a => a.id === activity.id ? activity : a))
      setSelectedActivity(activity)
    }
    else {
      const newActivity = {...activity, id: crypto.randomUUID()}
      setSelectedActivity(newActivity)
      setActivities([...activities, newActivity])
    }
    setEditMode(false)
  }
  const handleDelteActivity = (id: string) => {
      setActivities(activities.filter(a => a.id !== id))
  }

  
  return (
    <Box sx={{bgcolor: 'eeeeee'}}>
    <CssBaseline />
      <NavBar openForm={handleFormOpen} />
      <Container maxWidth='xl' sx={{mt: 4}} >
       <ActivityDashboard 
       selectActivity={handleSelectActivity}
       cancelSelectActivity={handleCancelSelectActivity}
       selectedActivity={selectedActivity}
       activities ={activities}
       editMode={editMode}
       openForm={handleFormOpen}
       closeForm={handleFormClose}
       submitForm = {handleSubmitForm} 
       deleteActivity = {handleDelteActivity}/>
      </Container>
     
   </Box>
  )
}

export default App
