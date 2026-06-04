import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@components/Layout/Layout'
import HomePage from '@pages/Home/HomePage'
import RoadmapPage from '@pages/Roadmap/RoadmapPage'
import LessonPage from '@pages/Lesson/LessonPage'
import FirstAppPage from '@pages/FirstApp/FirstAppPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="lesson/:moduleId" element={<LessonPage />} />
          <Route path="first-app" element={<FirstAppPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
