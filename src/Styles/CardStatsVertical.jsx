// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import DotsVertical from "mdi-material-ui/DotsVertical";

const CardStatsVertical = (props) => {
  // ** Props
  const { title, subtitle, color, icon, stats, trend, percentage, trendNumber } = props;

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            marginBottom: 3.25,
            alignItems: "flex-center",
            justifyItems: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              boxShadow: 3,
              color: "common.white",
              backgroundColor: `${color}.main`,
            }}
          >
            {icon}
          </Avatar>

        </Box>
        <Typography sx={{ fontWeight: 500, fontSize: "0.875rem", textAlign: "center" }} variant="body2">
          {title}
        </Typography>

        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", my: 2 }}>
          {stats}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: trend === "positive" ? "success.main" : "error.main", textAlign: "center" }}
        >
          {trendNumber}
        </Typography>

        <Typography
          variant="caption"
          color="primary"
          sx={{ textAlign: 'center', display: 'block', fontSize: '1rem',  }}
          
        >
          {percentage}
        </Typography>

        <Typography variant="caption">{subtitle}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardStatsVertical;

CardStatsVertical.defaultProps = {
  color: "primary",
  trend: "positive",
};
