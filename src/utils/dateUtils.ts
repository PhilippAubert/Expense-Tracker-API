export const calculateDateRange = (filter?: string, start?: string, end?: string) => {
    const now = new Date();
    let startDate: string | undefined;
    let endDate: string | undefined = now.toISOString();

    switch (filter) {
        case "past_week":
            startDate = new Date(new Date().setDate(now.getDate() - 7)).toISOString();
            break;
        case "past_month":
            startDate = new Date(new Date().setMonth(now.getMonth() - 1)).toISOString();
            break;
        case "last_3_months":
            startDate = new Date(new Date().setMonth(now.getMonth() - 3)).toISOString();
            break;
        case "custom":
            startDate = start;
            endDate = end;
            break;
        default:
            startDate = undefined;
            endDate = undefined;
    }

    return { startDate, endDate };
};