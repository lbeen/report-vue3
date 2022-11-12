export function getResourceLink(type, location, count, duration) {
    switch (type) {
        case 'HTML':
            return location
        case 'PPT':
            return '/#/kanban/ppt?location=' + location + '&count=' + count + '&duration=' + duration
        case 'VIDEO':
            return '/#/kanban/video?location=' + location
        default:
            return ''
    }
}