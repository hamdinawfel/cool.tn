import React, { useState } from 'react';
//Mui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux set up
import { connect } from 'react-redux';
import { paypal } from '../../../redux/actions/shopAction'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
    display:'block',
    margin:'10px 20px',
    [theme.breakpoints.down('xs')]: {
      margin:'10px 0',
      },
  },
  paymentMethod:{
    display:'flex'
  },
  text:{
    fontWeight:600,
    marginTop:5,
  },
  paypalLogo:{
    fontWeight:600,
    marginLeft:15,
  },
  pay: {
    color: '#253b80',
    fontStyle:'italic'
  },
  pal: {
    color: '#179bd7',
    fontStyle:'italic'
  },
  paypalBtn:{
      margin: '0 auto',
      display: 'flex',
      width:250,
      padding: '15px 30px',
      border:' 1px solid #FF9933',
      borderRadius: '5px',
      backgroundImage: 'linear-gradient(#FFF0A8, #F9B421)',
  },
  titleBtn:{
      fontSize:'10px',
      color: '#505050',
      textShadow: '0px 1px 0px rgba(255, 255, 255, 0.6)',
      verticalAlign: 'sub'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Paypal(props) {
  const classes = useStyles();
  const [ open, setOpen ] = useState(false)
 
  const handlePayment = () => {
    const paymentData = {
      items:[
        {
          //FIXME: custom order staff
          name: "cool staff",
          "price": props.data.total,
          "currency": "USD",
          "quantity": 1
        }
      ]
    }
    localStorage.setItem("total", paymentData.items[0].price);
    props.paypal(paymentData);
    setOpen(true)
  }
  return (
    <Grid className={classes.root}>
       <Grid className={classes.paymentMethod}>
        <Typography className={classes.text} color="textSecondary" component="h1" variant="h5">
           Paiement  en ligne 
        </Typography>
        
       </Grid>
      <Button variant="contained" className={classes.paypalBtn} onClick={()=>handlePayment()}>
        <Typography className={classes.titleBtn}>Payer avec</Typography>
        <Typography className={classes.paypalLogo}component="h1" variant="h5">
          <span className={classes.pay}>Pay</span>
          <span className={classes.pal}>Pal</span>
        </Typography>
      </Button>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
      
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
  shop: state.shop,
  data: state.data
});
const mapActionsToProps = {
 paypal
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Paypal);