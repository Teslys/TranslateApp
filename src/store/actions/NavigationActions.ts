export default {
    footerActivity: (state: any, action: {payload: boolean}): void => {
        state.activeFooter = action.payload;
      },
}