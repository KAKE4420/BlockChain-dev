import React from 'react';
import { Grid, Button, Typography, TextField, Paper, CircularProgress } from '@material-ui/core';

import { Link } from '../../routes';
import web3 from '../../libs/web3';
import PlanList from '../../libs/PlanList';
import withRoot from '../../libs/withRoot';
import Layout from '../../components/Layout';

class PlanCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sportName: " ",
            cost: 0,
            award: 0,
            sDate: 0,
            eDate: 0,
            errmsg: '',
            loading: false,
        };

        this.onSubmit = this.createPlan.bind(this);
    }

    getInputHandler(key) {
        return e => {
            console.log(e.target.value);
            this.setState({ [key]: e.target.value });
        };
    }
    async createPlan() {
      const { sportName, cost, award, sDate, eDate } = this.state;
        console.log(this.state);
    
            // 字段合规检查
        if (!sportName) {
                  return this.setState({ errmsg: '计划名称不能为空' });
        }
        if (cost <= 0) {
              return this.setState({ errmsg: '计划代价金额必须大于0' });
        }
        if (award <= 0) {
              return this.setState({ errmsg: '计划激励金额必须大于0' });
        }
        if (sDate <= 0) {
            return this.setState({ errmsg: '计划开始时间必须填写' });
        }
        if (eDate <= 0) {
            return this.setState({ errmsg: '计划结束时间必须填写' });
        }
        if (eDate < sDate) {
              return this.setState({ errmsg: '计划开始时间必须小于结束时间' });
        }
        try {
            this.setState({ loading: true });
                // 获取账户
            const accounts = await web3.eth.getAccounts();
            const owner = accounts[0];
                // 创建项目
            const result = await PlanList.methods
                .createPlan(sportName, cost, award, sDate, eDate)
                .send({ from: owner, gas: '5000000' });
    
            this.setState({ errmsg: '项目创建成功' });
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
        return (
            <Layout>
                <Typography variant="title" color="inherit">
                    创建项目
                </Typography>
                <Paper style={{ width: '60%', padding: '15px', marginTop: '15px' }}>
                    <form noValidate autoComplete="off" style={{ marginBottom: '15px' }}>
                        <TextField
                            fullWidth
                            required
                            id="sportName"
                            label="*计划名称"
                            value={this.state.sportName}
                            onChange={this.getInputHandler('sportName')}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            id="cost"
                            label="*计划代价"
                            value={this.state.cost}
                            onChange={this.getInputHandler('cost')}
                            margin="normal"
                            InputProps={{ endAdornment: 'ETH' }}
                        />
                        <TextField
                            fullWidth
                            required
                            id="award"
                            label="*计划激励金"
                            value={this.state.award}
                            onChange={this.getInputHandler('award')}
                            margin="normal"
                            InputProps={{ endAdornment: 'ETH' }}
                        />
                        <TextField
                            fullWidth
                            required
                            id="sDate"
                            label="*计划开始时间"
                            value={this.state.sDate}
                            onChange={this.getInputHandler('sDate')}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            id="eDate"
                            label="*计划结束时间"
                            value={this.state.eDate}
                            onChange={this.getInputHandler('eDate')}
                            margin="normal"
                        />
                    </form>
                    <Button variant="raised" size="large" color="primary" onClick={this.onSubmit}>
                        {this.state.loading ? <CircularProgress color="secondary" size={24} /> : '创建项目'}
                    </Button>
                    {!!this.state.errmsg && (
                        <Typography component="p" style={{ color: 'red' }}>
                        {this.state.errmsg}
                        </Typography>
                    )}
                </Paper>
            </Layout>
        );
    }
}

export default withRoot(PlanCreate);