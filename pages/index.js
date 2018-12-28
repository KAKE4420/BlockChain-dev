import React from 'react';
import { Grid, Button, Typography, Card, CardContent, CardActions, LinearProgress } from '@material-ui/core';

import { Link } from '../routes';
import web3 from '../libs/web3';
import SportPlan from '../libs/SportPlan';
import PlanList from '../libs/PlanList';
import withRoot from '../libs/withRoot';
import Layout from '../components/Layout';
import InfoBlock from '../components/InfoBlock'

class Index extends React.Component {
    static async getInitialProps({ req }) {
        const addressList = await PlanList.methods.getPlan().call();
            const summaryList = await Promise.all(
                  addressList.map(address =>
                        SportPlan(address)
                          .methods.getSummary()
                          .call()
                      )
                );
            console.log({ summaryList });
            const projects = addressList.map((address, i) => {
                        const [sportName, cost, award, sDate, eDate, enable, status, userID] = Object.values(
                        summaryList[i]
                    );
            
            return {
                address,
                sportName,
                cost,
                award,
                sDate,
                eDate,
                enable,
                status,
                userID,
                };
            });

        console.log(projects);

        return { projects };
    }

    render() {
        const { projects } = this.props;
        return (
            <Layout>
                <Grid container spacing={16}>
                    {projects.map(this.renderProject)}
                </Grid>
            </Layout>

        );
    }

    renderProject(project) {
        const progress = 1 / 1 * 100;
        return (
            <Grid item md={6} key={project.address}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant = "headline" component = "h2" >
                                {project.sportName}
                        </Typography >
                        <LinearProgress style={{ margin: '10px 0' }} color="primary" variant="determinate" value={progress} />
                        <Grid container spacing={16}>
                            <InfoBlock title={`${project.sportName}`} description="计划名称" />
 
                            <InfoBlock title={`${project.sDate}`} description="开始时间" />
                            <InfoBlock title={`${project.eDate}`} description="结束时间" />
                            
                        </Grid>
                    </CardContent >
                    <CardActions>
                        {project.enable && project.status && (
                            <Button size="small" color="secondary" >
                                未完成
                            </Button >
                        )}
                        {!(project.enable) && (project.status) && (
                            <Button size="small" color="primary" >
                                已完成
                            </Button >
                        )}
                        {!(project.enable) && !(project.status) && (
                            <Button size="small" color="secondary" >
                                已取消
                            </Button >
                        )}
                        {(project.enable) && !(project.status) && (
                            <Button size="small" color="secondary" >
                                已超时
                            </Button >
                        )}
                        <Link route={`/projects/${project.address}`}>
                            <Button size="small" color = "primary" >
                                查看详情
                            </Button >
                        </Link >
                    </CardActions >   
                </Card >
            </Grid >
            );
      }
}
export default withRoot(Index);
