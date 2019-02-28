from bottle import get, post, request, run# or route

import pandas as pd
import numpy
from sklearn import model_selection, naive_bayes, metrics


from sklearn.feature_extraction.text import TfidfVectorizer


dataFrameToTrain = pd.read_csv('FeedData.csv')

# word level tf-idf
tfidf_vect = TfidfVectorizer(analyzer='word', token_pattern=r'\w{1,}', max_features=5000)
tfidf_vect.fit(dataFrameToTrain['Response'])


xtrain_tfidf =  tfidf_vect.transform(dataFrameToTrain['Response'])

classifier = naive_bayes.MultinomialNB()

classifier.fit(xtrain_tfidf, dataFrameToTrain['Target'].values)

#predictFew = pd.Series(numpy.array(['I meditate','meditate']).astype(str))
#predictFew_tfidf =  tfidf_vect.transform(predictFew)
#predictions = classifier.predict(predictFew_tfidf)
#print type(predictions)
#print predictions

def getPromptText(TargetValue):
    return dataFrameToTrain[dataFrameToTrain['Target']==TargetValue]['Prompts'].values[0]


@post('/getCluster') 
def getCluster():
    global classifier
    global tfidf_vect

    #print "In Get Cluster"
    
    #Access the 
    requestJsonObject = request.json

    if requestJsonObject == None or 'predictStatements' not in requestJsonObject:
        return { "ErrorMessage": "predictStatements :: Field not found","message": "Error Occured" }
    
    if len(requestJsonObject['predictStatements']) <= 0:
        return { "ErrorMessage": "predictStatements :: Field found but no value assigned to predict","message": "Error Occured" }

    #print requestJsonObject['predictStatements']
	
    
    #print "Previous Prediction"
    #print predictions
    
    predictFew = pd.Series(numpy.array(requestJsonObject['predictStatements']).astype(str))

    predictFew_tfidf =  tfidf_vect.transform(predictFew)
    pred = classifier.predict(predictFew_tfidf)
    #print pred

    myResultList = []

    for singlePrediction in pred:
        myTempDict = {}
        myTempDict['TargetClass'] = singlePrediction
        myTempDict['PromptStatement'] = getPromptText(singlePrediction)
        myResultList.append(myTempDict)

      
    
    # Return prediction
    return { "promptPrediction": myResultList, "message": "Successfully displayed" }
    



run(host='localhost', port=6080,server='paste')