export const dashboardController = {
  index: {
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials;

      const viewData = {
        title: "Dashboard",
        user: loggedInUser,
      };

      return h.view("dashboard-view", viewData);
    },
  },
};
