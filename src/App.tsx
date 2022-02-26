import Navbar from './Components/NavBar/Navbar'
import React, { lazy, Suspense } from 'react'
import ThreeColGridPlaceholder from './Components/Common/ThreeColGridPlaceholder';
import SearchBar from './Components/Common/SearchBar';
const ObjectGallery = React.lazy(() => import('./Components/Gallery/ObjectGallery'));
function App() {
  return (
    <div className="w-full max-w-full min-h-screen">
      <Navbar />
      <Suspense fallback={<ThreeColGridPlaceholder rows={3} />}>
        <ObjectGallery />
      </Suspense>
    </div>
  )
}

export default App
