import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

import HomePage from "./pages/HomePage";
import FindJobs from "./pages/FindJobs";
import ResumeBuilder from "./pages/ResumeBuilder";
import InterviewPrep from "./pages/InterviewPrep";
import ServicesPage from "./pages/ServicesPage";
import PostJob from "./pages/PostJob";

import CareerInsightsPage from "./pages/career/CareerInsights";
import PursuePassion from "./pages/career/PursuePassion";
import JobSearchStrategies from "./pages/career/JobSearchStrategies";
import TrendingCareers from "./pages/career/TrendingCareers";
import CareerStats from "./pages/career/CareerStats";
import GrowthGraphs from "./pages/career/GrowthGraphs";
import HowWeHelp from "./pages/career/HowWeHelp";
import Upskill from "./pages/career/Upskill";
import CareerOptionsPage from "./pages/career/CareerOptions";

import AdminPanel from "./pages/AdminPanel";
import AdminEmployerVerifications from "./pages/AdminEmployerVerifications";

function App() {
  return (
      <Router>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />

          {/* Authentication Pages */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* User Profile */}
          <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />

          {/* Career Insights and Services */}
          <Route path="/career-insights" element={<Layout><CareerInsightsPage /></Layout>} />
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />

          {/* Career Option Pages */}
          <Route path="/pursue-passion" element={<Layout><PursuePassion /></Layout>} />
          <Route path="/job-search-strategies" element={<Layout><JobSearchStrategies /></Layout>} />
          <Route path="/trending-careers" element={<Layout><TrendingCareers /></Layout>} />
          <Route path="/career-stats" element={<Layout><CareerStats /></Layout>} />
          <Route path="/growth-graphs" element={<Layout><GrowthGraphs /></Layout>} />
          <Route path="/how-we-help" element={<Layout><HowWeHelp /></Layout>} />
          <Route path="/upskill" element={<Layout><Upskill /></Layout>} />
          <Route path="/career-options" element={<Layout><CareerOptionsPage /></Layout>} />

          {/* Job Search and Resources */}
          <Route path="/find-jobs" element={<Layout><FindJobs /></Layout>} />
          <Route path="/resume-builder" element={<Layout><ResumeBuilder /></Layout>} />
          <Route path="/interview-prep" element={<Layout><InterviewPrep /></Layout>} />

          {/* Job Posting */}
          <Route path="/post-job" element={<Layout><PostJob /></Layout>} />

          {/* Admin Panel - Protected */}
          <Route
            path="/admin"
            element={
                <Layout>
                  <AdminPanel />
                </Layout>
            }
          />
          <Route path="/employer-verifications" element={<Layout><AdminEmployerVerifications /></Layout>} />
        </Routes>
      </Router>
  );
}

export default App;
