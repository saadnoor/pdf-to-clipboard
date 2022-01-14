
function extractContent(req: any, res: any, next: any) {
    next();
    console.log('haha', req.file.size());
}

export default extractContent;