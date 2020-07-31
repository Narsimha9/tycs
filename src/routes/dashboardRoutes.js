/**
 * Dasboard Routes
 */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Practices from '../appModules/dashboard/practices/practices'
import Challenges from '../appModules/dashboard/challenges/challenges'
import Leaderboard from '../appModules/dashboard/leaderboard/leaderboard'
import ChallengesCodeEditor from '../appModules/dashboard/challenges/widgets/challengsCodeEditor'
import NotFound from "../components/sharedComponents/notFoundPage";
import PracticesCodeEditor from '../appModules/dashboard/practices/widgets/practicesCodeEditor';
const DashboardRoute = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={`${match.url}/practices`} component={Practices} />
      <Route exact path={`${match.url}/challenges`} component={Challenges} />
      <Route exact path={`${match.url}/leaderboard`} component={Leaderboard} />
      <Route
        exact
        path={`${match.url}/challenges/:id`}
        component={ChallengesCodeEditor}
      />
      <Route
        exact
        path={`${match.url}/practices/:id`}
        component={PracticesCodeEditor}
      />
      <Route path={`/*`} component={NotFound} />
    </Switch>
  </div>
);

export default DashboardRoute;