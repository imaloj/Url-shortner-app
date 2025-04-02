import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
        console.log("The full URL is: ", req.body.fullUrl);
        const { fullUrl } = req.body;
        const urlFound = await urlModel.find({fullUrl});//check if the URL already exists
        if (urlFound.length > 0) {
            res.status(409);//409 is the status code for conflict
            res.send("URL already exists");//
        } else {
            const shortUrl = await urlModel.create({ fullUrl });
            res.status(201).send(shortUrl);//201 is the status code for created
             
        }
    }
    catch (error) {
        res.status(500).send({ "Message ": "Something went wrong" });
    }
 };

export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrls = await urlModel.find();
        if (shortUrls.length < 0) {
            res.status(404).send({ "Message ": "No URL found" });
        } else {
            res.status(200).send(shortUrls);
        }
    } catch (error) {
                res.status(500).send({ "Message ": "Something went wrong" });

     }
};    
export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(404).send({ message: "Full URL not found" });
        } else {
            shortUrl.clicks++;
            shortUrl.save(); //increment the clicks by 1
            res.redirect(`${shortUrl.fullUrl}`);//redirect to the full URL

        }
    } catch (error) {
        res.status(500).send({ "Message ": "Something went wrong" });
    }
};
export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ message: "Requested URl has been successfully deleted" });
        }
    }
    catch (error) {
        res.status(500).send({ "Message ": "Something went wrong" });
    }
};
