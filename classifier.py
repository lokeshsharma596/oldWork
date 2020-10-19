import io
import os
import glob
import json
import numpy as np
import shutil


# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types
from google.oauth2 import service_account



credentials = service_account.Credentials. from_service_account_file("/Users/lokesh/Desktop/Classifier/imageclassify-270810-f00757bfad4a.json")
client = vision.ImageAnnotatorClient(credentials = credentials)

files=glob.glob('/Users/lokesh/Desktop/Classifier/resources/*')


categories=["Gadget","Document","Nature","Night","Sports","Tobacco","Photography","People","Graphics","Medicine","Architecture","Music","Logo","Text","Music"]
colors=["Yellow","Blue","Black","Green","Pink","Purple","White","Silver"]


path='/Users/lokesh/Desktop/Classifier/output/'
source='/Users/lokesh/Desktop/Classifier/resources/'
destination='/Users/lokesh/Desktop/Classifier/output/'
def my_classifier():
    data = {}

    for file in files:
        with io.open(file, 'rb') as image_file:
            file_stats = os.stat(file)
            if((file_stats.st_size / (1024 * 1024)) < 10 ):
                content = image_file.read()


        image = types.Image(content=content)

        response = client.label_detection(image=image)
        labels = response.label_annotations

        high=0
        name=""
        for label in labels:
            if(label.score>high):
                high=label.score
                name=label.description
            else:
                high=high


        if (name in colors):
            print("name")
            isdir = os.path.isdir(destination+'colors')
            if isdir:
                shutil.copyfile(source+file[43:],destination+'colors'+"/"+file[43:])
                print(destination + name + "/" + file[43:])
            else:
                os.mkdir(destination+'colors')
                shutil.copyfile(source+file[43:],destination+'colors'+"/"+file[43:])
                print(destination + name + "/" + file[43:])
        else:
            isdir = os.path.isdir(destination + name)

            if isdir:
                shutil.copyfile(source + file[43:], destination + name + "/" + file[43:])
                print(destination + name + "/" + file[43:])
            else:
                os.mkdir(destination + name)
                shutil.copyfile(source + file[43:], destination + name + "/" + file[43:])
                print(destination + name + "/" + file[43:])

    #     print(name,high,"lokesh")
    #     data[file[40:]]={name:high}
    #
    # with open('data.json', 'w') as outfile:
    #     json.dump(data, outfile)
    return data


if __name__ == '__main__':
   my_classifier()