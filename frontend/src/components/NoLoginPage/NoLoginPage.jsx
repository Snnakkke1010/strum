import React from "react";
import classes from './NoLoginPage.module.scss'
import {Link} from "react-router-dom";

const NoLoginPage = () => {
    return (
      <div className={classes.main}>
         <div className={classes.main__content}>
             <div className={classes.main__title}>
                <h1>STRUM</h1>
             </div>
              <div className={classes.main__link}>
                  <Link to="/authentication" className={classes.main__link}>
                      Приєднатись до нас
                  </Link>
          </div>
         </div>
      </div>
    )
}

export default NoLoginPage;