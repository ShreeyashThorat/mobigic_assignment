import { statusCodes, statusJson } from "../helper/status_codes.js";
import { db, dbRelease } from "../database.js";
import s3 from "../aws_configuration.js";
import logger from "../logger/logger.js";
import { encryptText, decryptText } from "../helper/files_helper.js";

const UploadFile = async (req, res) => {
    try {
        const file = req.file;
        const userid = req.user.userid;
        const { content } = req.body;
        if (!file) {
            return res.status(statusCodes.BAD_REQUEST).json(statusJson.badRequest({ error: "No file uploaded" }));
        }
        const [userData] = await db.query(`SELECT * from users WHERE userid = '${userid}'`);
        if (userData.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json(statusJson.notFound({ message: "User not found" }));
        }
        const key = `${userid}_${Date.now()}_${file.originalname}`;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        };

        const data = await s3.upload(params).promise();
        const fileUrl = data.Location;
        const password = Math.floor(100000 + Math.random() * 900000).toString();
        const encryptedPassword = encryptText(password)
        const insert = await db.execute(`INSERT INTO media (userid, content, media_url, media_key, file_name, media_pass) VALUES(?, ?, ?, ?, ?, ?)`, [userid, content ?? null, fileUrl, key, file.originalname, encryptedPassword])
        res.status(statusCodes.CREATED).json(statusJson.created({
            message: "File uploaded successfully", data: {
                "media_id": insert[0]?.insertId,
                "content": content,
                "media_url": fileUrl,
                "media_key": key,
                "file_name": file.originalname,
                "media_pass": password,
                "updated_at": new Date()
            }
        }));
    } catch (e) {
        logger.error(`Got an error while create user: ${e}`);
        return res.status(statusCodes.OK).json(statusJson.internalServerError({ error: e }));
    } finally {
        dbRelease();
    }
}

const GetFiles = async (req, res) => {
    try {
        const userid = req.user.userid;
        const [userData] = await db.query(`SELECT * from users WHERE userid = '${userid}'`);
        if (userData.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json(statusJson.notFound({ message: "User not found" }));
        }
        const [fileData] = await db.query(`SELECT * from media WHERE userid = "${userid}"`);
        if (fileData.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json(statusJson.notFound({ message: "File Data not found" }));
        }
        fileData.forEach((item) => {
            item.media_pass = decryptText(item.media_pass);
        });
        return res.status(statusCodes.OK).json(statusJson.ok({ message: "File deleted get successfully", data: fileData }));
    } catch (e) {
        logger.error(`Got an error while create user: ${e}`);
        return res.status(statusCodes.OK).json(statusJson.internalServerError({ error: e }));
    } finally {
        dbRelease();
    }
}


const DeleteFile = async (req, res) => {
    try {
        const { media_id } = req.query;
        const userid = req.user.userid;
        const [userData] = await db.query(`SELECT * from users WHERE userid = '${userid}'`);
        if (userData.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json(statusJson.notFound({ message: "User not found" }));
        }
        const [fileData] = await db.query(`SELECT * from media WHERE media_id = ${media_id} AND userid = "${userid}"`);
        if (fileData.length === 0) {
            return res.status(statusCodes.NOT_FOUND).json(statusJson.notFound({ message: "File Data not found" }));
        }

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileData[0].media_key,
        };

        await s3.deleteObject(params).promise();
        await db.execute(`DELETE FROM media WHERE media_id = ${media_id}`);
        return res.status(statusCodes.OK).json(statusJson.ok({ message: "File deleted successfully" }));
    } catch (e) {
        logger.error(`Got an error while create user: ${e}`);
        return res.status(statusCodes.OK).json(statusJson.internalServerError({ error: e }));
    } finally {
        dbRelease();
    }
}
export {
    UploadFile,
    DeleteFile,
    GetFiles
}