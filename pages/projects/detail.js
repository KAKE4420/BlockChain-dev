import React from 'react';
import { Grid, Button, Typography, LinearProgress, CircularProgress, Paper, TextField } from '@material-ui/core';

import { Link } from '../../routes';
import web3 from '../../libs/web3';
import SportPlan from '../../libs/SportPlan';
import PlanList from '../../libs/PlanList';
import withRoot from '../../libs/withRoot';
import Layout from '../../components/Layout';
import InfoBlock from '../../components/InfoBlock';

class PlanDetail extends React.Component {
    static async getInitialProps({ query }) {
        const contract = SportPlan(query.address);

        const summary = await contract.methods.getSummary().call();
        const [sportName, cost, award, sDate, eDate, enable, status, userID] = Object.values(
            summary
        );

        const project = {
            address: query.address,
            sportName,
            cost,
            award,
            sDate,
            eDate,
            enable,
            status,
            userID,
        };

        return { project };
    }
    constructor(props) {
        super(props);

        this.state = {
            time: 0,
            errmsg: '',
            loading: false,
            finsh: false,
            drop: false,
            chooseFinsh: true,
            chooseDrop: true,
        };

        this.onSubmit = this.finshPlans.bind(this);
        this.dropPlans = this.dropPlans.bind(this);
        this.setFinsh = this.setFinsh.bind(this);
        this.setDrop = this.setDrop.bind(this);
        this.resetFOrD = this.resetFOrD.bind(this);
    }

    getInputHandler(key) {
        return e => {
            console.log(e.target.value);
            this.setState({ [key]: e.target.value });
        };
    }
    setFinsh(){
        this.setState({ finsh: true, chooseDrop: false, chooseFinsh:false})
    }
    setDrop() {
        this.setState({ drop: true, chooseDrop: false, chooseFinsh: false })
    }
    resetFOrD(){
        this.setState({ finsh:false, drop: false, chooseDrop: true, chooseFinsh: true })
    }
    async dropPlans() {
        // 获取账户
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];

        // 发起转账
        const contract = SportPlan(this.props.project.address);
        const result = await contract.methods
            .dropPlan()
            .send({ from: owner, gas: '5000000' });
        this.setState({ errmsg: '计划已经取消'});
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
    async finshPlans() {
        const { time } = this.state;
        const { sDate, eDate } = this.props.project;
        console.log({ time, sDate, eDate });

            // 字段合规检查
        if (time <= 0) {
                return this.setState({ errmsg: '完成时间必须大于0' });
        }
        if (time < sDate) {
                return this.setState({ errmsg: '完成时间必须大于开始时间' });
        }

        try {
                this.setState({ loading: true, errmsg: '' });
                    // 获取账户
                const accounts = await web3.eth.getAccounts();
                const owner = accounts[0];
        
                    // 发起转账
                const contract = SportPlan(this.props.project.address);
                const result = await contract.methods
                    .finshPlan(time)
                    .send({ from: owner,  gas: '5000000' });
        
                this.setState({ errmsg: '计划完成', time: 0 });
                console.log(result);
        
                setTimeout(() => {
                    location.reload();
                    }, 1000);
            } catch (err) {
                    console.error(err);
                    this.setState({ errmsg: err.message || err.toString });
            } finally {
                this.setState({ loading: false });
            }
    }
    render() {
        const { project } = this.props;
        
        return (
            <Layout>
                <Typography variant="title" color="inherit" style={{ margin: '15px 0' }}>
                    项目详情
                </Typography>
                {this.renderBasicInfo(project)}
            </Layout>
        );
    }

    renderBasicInfo(project) {
        const progress = 1 / 1 * 100;
        var s;
        if (project.enable && project.status) {
            s = "未完成";
        }
        if (!(project.enable) && (project.status)) {
            s = "已完成";
        }
        if (!(project.enable) && !(project.status)) {
            s = "已取消";
        }
        if ((project.enable) && !(project.status)) {
            s = "已超时";
        }
        return (
            <Paper style={{ padding: '15px' }}>
                <Typography gutterBottom variant="headline" component="h2">
                    {project.sportName}
                </Typography>
                <LinearProgress style={{ margin: '10px 0' }} color="primary" variant="determinate" value={progress} />
                <Grid container spacing={16}>
                    <InfoBlock title={`${project.sportName}`} description="计划名称" />
                    <InfoBlock title={`${project.cost}`} description="计划代价" />
                    <InfoBlock title={`${project.award}`} description="计划奖励金" />
                    <InfoBlock title={`${project.sDate}`} description="开始时间" />
                    <InfoBlock title={`${project.eDate}`} description="结束时间" />
                    <InfoBlock title={`${s}`} description="计划状态" />
                </Grid>
                <Grid container spacing={16}>
                    <Grid item md={12}>
                        {this.state.chooseFinsh && (project.enable && project.status) &&(
                            <Button size="small" color="primary" onClick={this.setFinsh}>
                                完成计划
                            </Button>
                        )}
                        {this.state.chooseDrop && (project.enable && project.status) &&(
                            <Button size="small" color="secondary" onClick={this.setDrop}>
                                取消计划
                            </Button>
                        )}
                        {this.state.finsh && project.enable && project.status && (
                            <TextField
                            required
                            id="time"
                            label="*计划完成时间"
                            style={{ marginRight: '15px' }}
                            value={this.state.time}
                            onChange={this.getInputHandler('time')}
                            margin="normal"
                            />
                        )}
                        {this.state.finsh && project.enable && project.status && (
                            <Button size="small" variant="raised" color="primary" onClick={this.onSubmit}>
                                {this.state.loading ? <CircularProgress color="secondary" size={24} /> : '立即完成'}
                            </Button>
                        )}
                        {this.state.drop && (project.enable && project.status) && (
                            <Button size="small" variant="raised" color="primary" onClick = {this.dropPlans}>
                                立即取消
                            </Button>
                        )}
                        {(this.state.finsh||this.state.drop) && (project.enable && project.status) && (
                            <Button size="small" color="primary" onClick={this.resetFOrD}>
                                返回
                            </Button>
                        )}
                        {!!this.state.errmsg && (
                            <Typography component="p" style={{ color: 'red' }}>
                                {this.state.errmsg}
                            </Typography>
                        )}

                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withRoot(PlanDetail);